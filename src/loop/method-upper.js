const Method = require('./method');
const Value = require('./value');

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

  evaluate(receiver, args) {
    /**
     * @type {string}
     */
    const value = receiver.getValue();

    const result = value.toUpperCase();

    return new Value(result);
  }
}

module.exports = MethodUpper;
