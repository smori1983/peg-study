const MethodDef = require('./method-def');

class MethodDefUpper extends MethodDef {
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

module.exports = MethodDefUpper
