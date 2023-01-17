const Visitor = require('./visitor');

class VisitorOutputLine extends Visitor {
  supports(node) {
    return node.type === 'builtin' && node.text === 'output_line';
  }

  visit(node, scope, output, processor) {
    /**
     * @type {string[]}
     */
    const parts = [];

    node.children.forEach((child) => {
      if (child.type === 'string') {
        parts.push(child.text);
      } else if (child.type === 'variable') {
        parts.push(scope.getValue(this._prepareVariable(child)));
      }
    });

    output.addLine(parts.join(''));
  }
}

module.exports = VisitorOutputLine;
