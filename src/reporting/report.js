/**
 * @typedef {import('./item')} Item
 * @typedef {import('./node')} Node
 */

const Output = require('./output');
const Scope = require('./scope');

class Report {
  /**
   * @param {string[]} codes
   * @param {Node} rootNode
   */
  constructor(codes, rootNode) {
    /**
     * @private
     */
    this._codes = codes;

    /**
     * @private
     */
    this._rootNode = rootNode;
  }

  /**
   * @return {string[]}
   */
  getCodes() {
    return this._codes;
  }

  /**
   * @param {Item} item
   * @return {Output}
   */
  evaluate(item) {
    const scope = new Scope({
      code: item.getCode(),
      name: item.getName(),
      amount: item.getAmount(),
      comments: item.getComments(),
    });
    const output = new Output();

    this._rootNode.evaluate(scope, output);

    return output;
  }
}

module.exports = Report;
