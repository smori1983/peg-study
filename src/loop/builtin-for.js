const Scope = require('./scope');
const SymbolParent = require('./symbol-parent');
const Variable = require('./variable');

class BuiltinFor extends SymbolParent {
  /**
   * @param {Variable} array
   * @param {Variable} variable
   */
  constructor(array, variable) {
    super();

    /**
     * @type {Variable}
     * @private
     */
    this._array = array;

    /**
     * @type {Variable}
     * @private
     */
    this._variable = variable;
  }

  evaluate(scope, output) {
    const value = this._array.resolve(scope);

    if (value.getType() !== 'array') {
      throw new Error(this._array.getName() + ' should be an array');
    }

    const array = value.getValue();

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
