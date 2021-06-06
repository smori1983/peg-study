const MethodDef = require('./method-def');
const Value = require('./value');

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

  evaluate(receiver, args) {
    /**
     * @type {string}
     */
    const value = receiver.getValue();

    const result = value.toUpperCase();

    return new Value(result);
  }
}

module.exports = MethodDefUpper;
