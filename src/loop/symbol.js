const MethodInvoker = require('./method-invoker');
const Output = require('./output');
const Scope = require('./scope');

class Symbol {
  constructor() {
    /**
     * @type {MethodInvoker}
     * @protected
     */
    this._methodInvoker = new MethodInvoker();
  }

  /**
   * @param {Scope} scope
   * @param {Output} output
   */
  evaluate(scope, output) {
  }
}

module.exports = Symbol;
