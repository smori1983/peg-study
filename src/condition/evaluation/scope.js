class Scope {
  /**
   * @param {Object} [values]
   * @param {Scope} [parent]
   */
  constructor(values, parent) {
    this._values = values || {};
    this._parent = parent || null;
  }

  /**
   * @param {string[]} keys
   * @return {*}
   * @throws {Error}
   */
  getValue(keys) {
    if (keys.length === 0) {
      throw new Error('keys not specified');
    }

    if (this._isMyKey(keys[0])) {
      const result = this._find(keys);

      if (typeof result !== 'undefined') {
        return result;
      }
    } else if (this._parent) {
      return this._parent.getValue(keys);
    }

    throw new Error(`variable value not found for: [${keys.join('.')}]`);
  }

  /**
   * @param {string} key
   * @return {boolean}
   * @private
   */
  _isMyKey(key) {
    return this._values.hasOwnProperty(key);
  }

  /**
   * @param {string[]} keys
   * @return {*}
   * @private
   */
  _find(keys) {
    let current = this._values;

    for (let i = 0; i < keys.length; i++) {
      if (current.hasOwnProperty(keys[i])) {
        current = current[keys[i]];
      } else {
        return undefined;
      }
    }

    return current;
  }
}

module.exports = Scope;
