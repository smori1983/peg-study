const Method = require('./method');
const MethodArg = require('./method-arg');

class MethodUpper extends Method {
  getReceiverType() {
    return 'string';
  }

  getName() {
    return 'upper';
  }

  getArgTypes() {
    return [];
  }

  getReturnType() {
    return 'string';
  }

  /**
   * @param {string} receiver
   * @param {MethodArg[]} args
   * @return {string}
   */
  evaluate(receiver, args) {
    return receiver.toUpperCase();
  }
}

module.exports = MethodUpper;
