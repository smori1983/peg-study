const Symbol = require('./symbol');

class LanguageConstructDefLog extends Symbol {
  /**
   * @param {string} arg
   */
  constructor(arg) {
    super();

    /**
     * @type {string}
     * @private
     */
    this._arg = arg;
  }

  evaluate(scope) {
    console.log(scope.resolveVariable(this._arg));
  }
}

module.exports = LanguageConstructDefLog;
