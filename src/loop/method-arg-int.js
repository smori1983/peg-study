const MethodArg = require('./method-arg');

class MethodArgInt extends MethodArg {
  /**
   * @param {string} value
   */
  constructor(value) {
    super(parseInt(value, 10));
  }

  getType() {
    return 'int';
  }
}

module.exports = MethodArgInt;
