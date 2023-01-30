/**
 * @typedef {import('./scope')} Scope
 * @typedef {import('./output')} Output
 */

const Visitor = require('./visitor');

class VisitorCondition extends Visitor {
  supports(node) {
    return node.type === 'condition' && node.text === 'condition';
  }

  visit(node, scope, output, processor) {
    const block = this._getTruthyBlock(node, scope);

    if (Array.isArray(block)) {
      block.forEach((node) => {
        processor.visit(node, scope, output);
      });
    }
  }

  /**
   * @param {Object} node
   * @param {Scope} scope
   * @return {(Object[]|null)}
   * @private
   */
  _getTruthyBlock(node, scope) {
    const children = node.children;

    if (children[0].type === 'condition' && children[0].text === 'if') {
      if (this._evaluateCondition(children[0].attributes.condition, scope)) {
        return children[0].children;
      }
    }

    for (let i = 1; i < children.length; i++) {
      if (children[i].type === 'condition' && children[i].text === 'elseif') {
        if (this._evaluateCondition(children[i].attributes.condition, scope)) {
          return children[i].children;
        }
      }

      if (children[i].type === 'condition' && children[i].text === 'else') {
        return children[i].children;
      }
    }

    return null;
  }

  /**
   * @param {Object} node
   * @param {Scope} scope
   * @return {*|number|boolean}
   * @private
   */
  _evaluateCondition(node, scope) {
    return this._visitCondition(node, scope);
  }

  /**
   * @param {Object} node
   * @param {Scope} scope
   * @return {*|number|boolean}
   * @private
   */
  _visitCondition(node, scope) {
    if (node.type === 'bool') {
      return node.text === 'true';
    }

    if (node.type === 'int') {
      return parseInt(node.text, 10);
    }

    if (node.type === 'float') {
      return parseFloat(node.text);
    }

    if (node.type === 'string') {
      return node.text;
    }

    if (node.type === 'variable') {
      return scope.getValue(this._prepareVariable(node));
    }

    const left = this._visitCondition(node.children[0], scope);
    const right = this._visitCondition(node.children[1], scope);

    if (node.type === 'add' && node.text === '+') {
      return left + right;
    }

    if (node.type === 'add' && node.text === '-') {
      return left - right;
    }

    if (node.type === 'multi' && node.text === '*') {
      return left * right;
    }

    if (node.type === 'multi' && node.text === '/') {
      return left / right;
    }

    if (node.type === 'logical' && ['&&', 'and'].includes(node.text)) {
      return left && right;
    }

    if (node.type === 'logical' && ['||', 'or'].includes(node.text)) {
      return left || right;
    }

    if (node.type === 'comparative' && node.text === '==') {
      return left === right;
    }

    if (node.type === 'comparative' && node.text === '!=') {
      return left !== right;
    }

    if (node.type === 'comparative' && node.text === '>=') {
      return left >= right;
    }

    if (node.type === 'comparative' && node.text === '>') {
      return left > right;
    }

    if (node.type === 'comparative' && node.text === '<=') {
      return left <= right;
    }

    if (node.type === 'comparative' && node.text === '<') {
      return left < right;
    }

    throw new Error('unknown node: ' + node.type + '(' + node.text + ')');
  }
}

module.exports = VisitorCondition;
