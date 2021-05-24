const MethodInvoker = require('./method-invoker');
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

    /**
     * @type {MethodInvoker}
     * @private
     */
    this._methodInvoker = new MethodInvoker();
  }

  evaluate(scope, output) {
    const receiver = scope.resolveVariable(this._array.getName());
    const array = this._methodInvoker.invoke(receiver, this._array.getMethods());

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
