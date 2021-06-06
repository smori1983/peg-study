const Method = require('./method');
const Value = require('./value');

class MethodSplit extends Method {
  getReceiverType() {
    return 'string';
  }

  getName() {
    return 'split';
  }

  getArgTypes() {
    return ['string'];
  }

  getReturnType() {
    return 'array';
  }

  evaluate(receiver, args) {
    /**
     * @type {string}
     */
    const value = receiver.getValue();

    /**
     * @type {string}
     */
    const arg = args[0].getValue();

    const result = value.split(arg);

    return new Value(result);
  }
}

module.exports = MethodSplit;
