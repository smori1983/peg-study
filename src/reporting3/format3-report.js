const Item = require('../reporting/item');
const Node = require('./node');
const Output = require('./format3-output');
const Scope = require('./scope');

class Format3Report {
  /**
   * @param {string[]} codes
   * @param {Node} outputNode
   */
  constructor(codes, outputNode) {
    /**
     * @private
     */
    this._codes = codes;

    /**
     * @private
     */
    this._outputNode = outputNode;
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

    this._outputNode.evaluate(scope, output);

    return output;
  }
}

module.exports = Format3Report;
