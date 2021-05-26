const Method = require('./method');
const MethodArg = require('./method-arg');

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
   * @param {MethodArg[]} args
   * @return {string}
   */
  evaluate(receiver, args) {
    return receiver.join(args[0].getValue());
  }
}

module.exports = MethodJoin;
