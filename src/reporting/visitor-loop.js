const Scope = require('./scope');
const Visitor = require('./visitor');

class VisitorLoop extends Visitor {
  supports(node) {
    return node.type === 'builtin' && node.text === 'loop';
  }

  visit(node, scope, output, processor) {
    const array = scope.getValue(this._prepareVariable(node.attributes.array));

    if (!Array.isArray(array)) {
      throw new Error('Not an array');
    }

    for (let i = 0; i < array.length; i++) {
      const variables = {};

      variables[node.attributes.variable.text] = array[i];

      const childScope = new Scope(variables, scope);

      node.children.forEach((child) => {
        processor.visit(child, childScope, output);
      });
    }
  }
}

module.exports = VisitorLoop;
