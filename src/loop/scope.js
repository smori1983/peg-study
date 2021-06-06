class Scope {
  /**
   * @param {Scope} [parent]
   */
  constructor(parent) {
    this._parent = parent || null;
    this._variables = {};
  }

  addVariable(name, value) {
    this._variables[name] = value;
  }

  hasVariable(name) {
    return this._variables.hasOwnProperty(name);
  }

  getVariable(name) {
    if (this.hasVariable(name)) {
      return this._variables[name];
    }

    throw new Error('variable not found: ' + name);
  }

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
