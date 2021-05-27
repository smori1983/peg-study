const VariableMethodArg = require('./variable-method-arg');

class VariableMethod {
  /**
   * @param {string} text
   * @param {VariableMethodArg[]} args
   */
  constructor(text, args) {
    this._text = text;
    this._args = args;
  }

  /**
   * @return {string}
   */
  getText() {
    return this._text;
  }

  getArgs() {
    return this._args;
  }
}

module.exports = VariableMethod;
