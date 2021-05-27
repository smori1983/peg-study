const VariableMethod = require('./variable-method');

class Variable {
  /**
   * @param {string} name
   * @param {VariableMethod[]} [methods]
   */
  constructor(name, methods) {
    this._name = name;
    this._methods = methods || [];
  }

  /**
   * @return {string}
   */
  getName() {
    return this._name;
  }

  /**
   * @return {VariableMethod[]}
   */
  getMethods() {
    return this._methods;
  }
}

module.exports = Variable;
