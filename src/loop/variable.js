const Scope = require('./scope');
const Value = require('./value');

class Variable {
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name;

    /**
     * @type {(VariableMethod|VariableProperty)[]}
     * @private
     */
    this._methodChain = [];
  }

  /**
   * @param {(VariableMethod|VariableProperty)} item
   */
  addMethod(item) {
    this._methodChain.push(item);
  }

  /**
   * @return {string}
   */
  getName() {
    return this._name;
  }

  /**
   * @param {Scope} scope
   * @return {Value}
   */
  resolve(scope) {
    let receiver = new Value(scope.resolveVariable(this._name));

    this._methodChain.forEach((item) => {
      receiver = item.evaluate(scope, receiver);
    });

    return receiver;
  }
}

module.exports = Variable;
