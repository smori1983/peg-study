class MethodArg {
  /**
   * @param {*} value
   */
  constructor(value) {
    /**
     * @type {*}
     * @protected
     */
    this._value = value;
  }

  /**
   * @return {string}
   */
  getType() {
  }

  /**
   * @returns {*}
   */
  getValue() {
    return this._value;
  }
}

module.exports = MethodArg;
