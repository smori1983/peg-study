class Variable {
  /**
   * @param {string} name
   * @param {Object[]} [methods]
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
   * @return {Object[]}
   */
  getMethods() {
    return this._methods;
  }
}

module.exports = Variable;
