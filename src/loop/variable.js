const Scope = require('./scope');
const Value = require('./value');

class Variable {
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name;

    /**
     * @type {VariableChain[]}
     * @private
     */
    this._chain = [];
  }

  /**
   * @param {VariableChain} item
   */
  addChainItem(item) {
    this._chain.push(item);
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

    this._chain.forEach((item) => {
      receiver = item.evaluate(receiver, scope);
    });

    return receiver;
  }
}

module.exports = Variable;
