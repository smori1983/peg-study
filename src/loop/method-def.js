/**
 * @typedef {import('./value')} Value
 */

class MethodDef {
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
   * @param {Value} receiver
   * @param {Value[]} args
   * @return {Value}
   */
  evaluate(receiver, args) {
  }
}

module.exports = MethodDef;
