const Symbol = require('./symbol');

class SymbolParent extends Symbol {
  constructor() {
    super();

    /**
     * @type {Symbol[]}
     * @protected
     */
    this._children = [];
  }

  /**
   * @param {Symbol} child
   */
  addChild(child) {
    this._children.push(child);
  }
}

module.exports = SymbolParent;
