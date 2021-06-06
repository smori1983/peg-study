const MethodDef = require('./method-def');
const Value = require('./value');

class MethodDefJoin extends MethodDef {
  getReceiverType() {
    return 'array';
  }

  getName() {
    return 'join';
  }

  getArgTypes() {
    return ['string'];
  }

  getReturnType() {
    return 'string';
  }

  evaluate(receiver, args) {
    /**
     * @type {*[]}
     */
    const value = receiver.getValue();

    /**
     * @type {string}
     */
    const arg = args[0].getValue();

    const result = value.join(arg);

    return new Value(result);
  }
}

module.exports = MethodDefJoin;
