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

  evaluate(receiver, args) {
    /**
     * @type {string}
     */
    const value = receiver.getValue();

    const result = value.toLowerCase();

    return new Value(result);
  }
}

module.exports = MethodLower;
