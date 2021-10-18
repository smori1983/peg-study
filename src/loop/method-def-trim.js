const MethodDef = require('./method-def');
const Value = require('./value');

class MethodDefTrim extends MethodDef {
  getReceiverType() {
    return 'string';
  }

  getName() {
    return 'trim';
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

    return new Value(value.trim());
  }
}

module.exports = MethodDefTrim;
