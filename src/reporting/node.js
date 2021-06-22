const Output = require('./output');
const Scope = require('./scope');

class Node {
  constructor() {
    /**
     * @type {Node[]}
     * @protected
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
   * @throws {Error}
   */
  evaluate(scope, output) {
  }
}

module.exports = Node;
