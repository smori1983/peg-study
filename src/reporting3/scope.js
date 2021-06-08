class Scope {
  /**
   * @param {Scope} [parent]
   */
  constructor(parent) {
    this._parent = parent || null;
    this._variables = {};
  }

  /**
   * @param {string} name
   * @param {*} value
   */
  addVariable(name, value) {
    this._variables[name] = value;
  }

  /**
   * @param {string} name
   * @return {boolean}
   */
  hasVariable(name) {
    return this._variables.hasOwnProperty(name);
  }

  /**
   * @param name
   * @return {*}
   * @throws {Error}
   */
  getVariable(name) {
    if (this.hasVariable(name)) {
      return this._variables[name];
    }

    throw new Error('variable not found: ' + name);
  }

  /**
   * @param {string} name
   * @return {*}
   * @throws {Error}
   */
  resolveVariable(name) {
    if (this.hasVariable(name)) {
      return this.getVariable(name);
    }

    if (this._parent) {
      return this._parent.resolveVariable(name);
    }

    throw new Error('variable not found: ' + name);
  }
}

module.exports = Scope;
