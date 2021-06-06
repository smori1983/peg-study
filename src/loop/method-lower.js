const Method = require('./method');
const Value = require('./value');

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
   * @param {Value[]} args
   * @return {string}
   */
  evaluate(receiver, args) {
    return receiver.toLowerCase();
  }
}

module.exports = MethodLower;
