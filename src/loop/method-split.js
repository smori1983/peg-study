const Method = require('./method');
const MethodArg = require('./method-arg');

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

  /**
   * @param {string} receiver
   * @param {MethodArg[]} args
   * @return {string[]}
   */
  evaluate(receiver, args) {
    return receiver.split(args[0].getValue());
  }
}

module.exports = MethodSplit;
