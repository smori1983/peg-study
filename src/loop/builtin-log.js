const Symbol = require('./symbol');
const Variable2 = require('./variable2');

class BuiltinLog extends Symbol {
  /**
   * @param {Variable2} arg
   */
  constructor(arg) {
    super();

    /**
     * @type {Variable2}
     * @private
     */
    this._arg = arg;
  }

  evaluate(scope, output) {
    output.addLine(this._arg.evaluate(scope));
  }
}

module.exports = BuiltinLog;
