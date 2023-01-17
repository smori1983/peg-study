/**
 * @typedef {import('./processor')} Processor
 * @typedef {import('./scope')} Scope
 * @typedef {import('./output')} Output
 */

class Visitor {
  /**
   * @param {Object} node
   * @returns {boolean}
   */
  supports(node) {
    return false;
  }

  /**
   * @param {Object} node
   * @param {Scope} scope
   * @param {Output} output
   * @param {Processor} processor
   */
  visit(node, scope, output, processor) {
  }

  /**
   * @param {Object} node
   * @returns {string[]}
   * @protected
   */
  _prepareVariable(node) {
    const keys = [];

    let current = node;

    do {
      keys.push(current.text);
      current = current.children[0];
    } while (current && current.type === 'property');

    return keys;
  }
}

module.exports = Visitor;
