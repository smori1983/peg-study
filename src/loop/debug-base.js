const Builder = require('../loop/builder');
const Output = require('../loop/output');
const Scope = require('../loop/scope');

class DebugBase {
  /**
   * @param {PEG.Parser} parser
   */
  constructor(parser) {
    /**
     * @private
     */
    this._parser = parser;
  }

  /**
   * @param {string} input
   * @param {Scope} scope
   * @returns {Output}
   */
  get(input, scope) {
    const parsed = this._parser.parse(input);

    const builder = new Builder();
    const root = builder.build(parsed);
    const output = new Output();

    root.evaluate(scope, output);

    return output;
  }
}

module.exports = DebugBase;
