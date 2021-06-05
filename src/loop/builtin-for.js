const Scope = require('./scope');
const SymbolParent = require('./symbol-parent');
const Variable2 = require('./variable2');

class BuiltinFor extends SymbolParent {
  /**
   * @param {Variable2} array
   * @param {Variable2} variable
   */
  constructor(array, variable) {
    super();

    /**
     * @type {Variable2}
     * @private
     */
    this._array = array;

    /**
     * @type {Variable2}
     * @private
     */
    this._variable = variable;
  }

  evaluate(scope, output) {
    const array = this._array.evaluate(scope);

    if (!Array.isArray(array)) {
      throw new Error(this._array + ' is not array');
    }

    for (let i = 0; i < array.length; i++) {
      const childScope = new Scope(scope);
      childScope.addVariable(this._variable.getName(), array[i]);

      this._children.forEach((child) => {
        child.evaluate(childScope, output);
      });
    }
  }
}

module.exports = BuiltinFor;
