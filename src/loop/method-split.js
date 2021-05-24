const Method = require('./method');

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
   * @param {*[]} args
   * @return {string[]}
   */
  evaluate(receiver, args) {
    return receiver.split(args[0]);
  }
}

module.exports = MethodSplit;
