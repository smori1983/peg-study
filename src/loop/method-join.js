const Method = require('./method');

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
   * @param {*[]} args
   * @return {string}
   */
  evaluate(receiver, args) {
    return receiver.join(args[0]);
  }
}

module.exports = MethodJoin;
