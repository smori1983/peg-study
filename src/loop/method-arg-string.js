const MethodType = require('./method-arg');

class MethodArgString extends MethodType {
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
