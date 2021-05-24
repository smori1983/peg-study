const Method = require('./method');

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
   * @param {*[]} args
   * @return {string}
   */
  evaluate(receiver, args) {
    return receiver.toUpperCase();
  }
}

module.exports = MethodUpper;
