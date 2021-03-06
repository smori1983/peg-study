const Scope = require('./scope');
const Value = require('./value');

class Variable {
  /**
   * @param {string} name
   */
  constructor(name) {
    /**
     * @private
     */
    this._name = name;
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
    return new Value(scope.resolveVariable(this._name));
  }
}

module.exports = Variable;
