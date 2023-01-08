/**
 * @typedef {import('./output')} Output
 * @typedef {import('./scope')} Scope
 */

class Node {
  constructor() {
    /**
     * @type {Node[]}
     * @private
     */
    this._children = [];
  }

  /**
   * @param {Node} child
   */
  addChild(child) {
    this._children.push(child);
  }

  /**
   * @param {Scope} scope
   * @param {Output} output
   */
  evaluate(scope, output) {
  }
}

module.exports = Node;
