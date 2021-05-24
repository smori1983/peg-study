class Variable {
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name;
  }

  /**
   * @return {string}
   */
  getName() {
    return this._name;
  }
}

module.exports = Variable;
