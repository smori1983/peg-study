const Method = require('./method');
const Value = require('./value');

class MethodJoin extends Method {
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

  /**
   * @param {string[]} receiver
   * @param {Value[]} args
   * @return {string}
   */
  evaluate(receiver, args) {
    return receiver.join(args[0].getValue());
  }
}

module.exports = MethodJoin;
