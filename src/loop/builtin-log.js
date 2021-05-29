const Symbol = require('./symbol');
const Variable = require('./variable');

class BuiltinLog extends Symbol {
  /**
   * @param {Variable} arg
   */
  constructor(arg) {
    super();

    /**
     * @type {Variable}
     * @private
     */
    this._arg = arg;
  }

  evaluate(scope, output) {
    output.addLine(this._methodInvoker.invoke(scope, this._arg));
  }
}

module.exports = BuiltinLog;
