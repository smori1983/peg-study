const MethodArg = require('./method-arg');

class MethodArgString extends MethodArg {
  /**
   * @param {string} value
   */
  constructor(value) {
    super(value);
  }

  getType() {
    return 'string';
  }
}

module.exports = MethodArgString;
