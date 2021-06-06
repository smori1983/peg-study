const Value = require('./value');

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
   * @param {Value[]} args
   * @return {*}
   */
  evaluate(receiver, args) {
  }
}

module.exports = Method;
