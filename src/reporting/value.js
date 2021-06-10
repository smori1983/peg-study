class Value {
  /**
   * @param {*} value
   */
  constructor(value) {
    /**
     * @private
     */
    this._value = value;
  }

  /**
   * @return {string}
   */
  getType() {
    if (this._value === null) {
      return 'null';
    } else if (Array.isArray(this._value)) {
      return 'array';
    } else {
      return typeof this._value;
    }
  }

  /**
   * @return {*}
   */
  get() {
    return this._value;
  }
}

module.exports = Value;
