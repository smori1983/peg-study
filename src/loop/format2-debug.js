const parser = require('./format2');
const Builder = require('./format2-builder');
const Output = require('./output');
const Scope = require('./scope');

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
