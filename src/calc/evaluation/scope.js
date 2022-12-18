class Scope {
  /**
   * @param {Object} [values]
   */
  constructor(values) {
    this._values = values || {};
  }

  /**
   * @param name
   * @return {*}
   * @throws {Error}
   */
  getValue(name) {
    if (this._values.hasOwnProperty(name)) {
      return this._values[name];
    }

    throw new Error('variable value not found for: ' + name);
  }
}

module.exports = Scope;
