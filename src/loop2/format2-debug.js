const parser = require('./format2');
const Builder = require('../loop/builder');
const Output = require('../loop/output');
const Scope = require('../loop/scope');

class Format2Debug {
  /**
   * @param {string} input
   * @param {Scope} scope
   * @returns {Output}
   */
  get(input, scope) {
    const parsed = parser.parse(input);

    const builder = new Builder();
    const root = builder.build(parsed);
    const output = new Output();

    root.evaluate(scope, output);

    return output;
  }
}

module.exports = Format2Debug;
