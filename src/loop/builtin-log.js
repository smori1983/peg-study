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
    output.addLine(scope.resolveVariable(this._arg.getName()));
  }
}

module.exports = BuiltinLog;
