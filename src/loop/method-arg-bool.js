const MethodArg = require('./method-arg');

class MethodArgBool extends MethodArg {
  /**
   * @param {string} value
   */
  constructor(value) {
    super(value === 'true');
  }

  getType() {
    return 'bool';
  }
}

module.exports = MethodArgBool;
