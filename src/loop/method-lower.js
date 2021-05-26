const Method = require('./method');
const MethodArg = require('./method-arg');

class MethodLower extends Method {
  getReceiverType() {
    return 'string';
  }

  getName() {
    return 'lower';
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
    return receiver.toLowerCase();
  }
}

module.exports = MethodLower;
