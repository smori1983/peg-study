const MethodArg = require('./method-arg');

class Method {
  /**
   * @return {string}
   */
  getReceiverType() {
  }

  /**
   * @return {string}
   */
  getName() {
  }

  /**
   * @return {string[]}
   */
  getArgTypes() {
  }

  /**
   * @return {string}
   */
  getReturnType() {
  }

  /**
   * @param {*} receiver
   * @param {MethodArg[]} args
   * @return {*}
   */
  evaluate(receiver, args) {
  }
}

module.exports = Method;
