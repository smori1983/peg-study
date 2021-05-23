const Scope = require('./scope');
const SymbolParent = require('./symbol-parent');

class LanguageConstructDefFor extends SymbolParent {
  /**
   * @param {string} array
   * @param {string} variable
   */
  constructor(array, variable) {
    super();

    /**
     * @type {string}
     * @private
     */
    this._array = array;

    /**
     * @type {string}
     * @private
     */
    this._variable = variable;
  }

  evaluate(scope) {
    const array = scope.resolveVariable(this._array);

    if (!Array.isArray(array)) {
      throw new Error(this._array + ' is not array');
    }

    for (let i = 0; i < array.length; i++) {
      const childScope = new Scope(scope);
      childScope.addVariable(this._variable, array[i]);

      this._children.forEach((child) => {
        child.evaluate(childScope);
      });
    }
  }
}

module.exports = LanguageConstructDefFor;
