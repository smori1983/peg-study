/**
 * @typedef {import('../../src/loop/scope')} Scope
 */

const Builder = require('../../src/loop/builder');
const Output = require('../../src/loop/output');

class Debug {
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

module.exports = Debug;
