const MethodDef = require('./method-def');

class MethodDefLower extends MethodDef {
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
   * @param {*[]} args
   * @return {string}
   */
  evaluate(receiver, args) {
    return receiver.toLowerCase();
  }
}

module.exports = MethodDefLower;
