class VariableMethodArg {
  /**
   * @param {string} type
   * @param {string} text
   */
  constructor(type, text) {
    this._type = type;
    this._text = text;
  }

  /**
   * @return {string}
   */
  getType() {
    return this._type;
  }

  /**
   * @return {string}
   */
  getText() {
    return this._text;
  }
}

module.exports = VariableMethodArg;
