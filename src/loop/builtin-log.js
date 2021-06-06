const Node = require('./node');
const Variable = require('./variable');

class BuiltinLog extends Node {
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
    output.addLine(this._arg.resolve(scope).getValue());
  }
}

module.exports = BuiltinLog;
