const Item = require('../reporting/item');
const Node = require('../reporting/node');
const Output = require('../reporting/output');
const Scope = require('../reporting/scope');

class Format3Report {
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
    const scope = new Scope();
    scope.addVariable('code', item.getCode());
    scope.addVariable('name', item.getName());
    scope.addVariable('amount', item.getAmount());
    scope.addVariable('comments', item.getComments());

    const output = new Output();

    this._rootNode.evaluate(scope, output);

    return output;
  }
}

module.exports = Format3Report;
