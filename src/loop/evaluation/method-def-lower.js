const MethodDef = require('./method-def');
const Value = require('./value');

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

  evaluate(receiver, args) {
    /**
     * @type {string}
     */
    const value = receiver.getValue();

    const result = value.toLowerCase();

    return new Value(result);
  }
}

module.exports = MethodDefLower;
