const {it} = require('mocha');
const assert = require('assert');

const MethodManager = require('../../src/method/evaluation/method-manager');
const Scope = require('../../src/method/evaluation/scope');

/**
 * @param {PEG.Parser} parser
 * @param {string} input
 * @param {Object} variables
 * @return {(boolean|string)}
 */
const validate = (parser, input, variables) => {
  try {
    new MethodManager().validate(parser.parse(input), new Scope(variables));
    return true;
  } catch (e) {
    return e.message;
  }
};

/**
 * @param {PEG.Parser} parser
 * @param {string} input
 * @param {Object} variables
 * @return {*}
 */
const invoke = (parser, input, variables) => {
  try {
    return new MethodManager().invoke(parser.parse(input), new Scope(variables));
  } catch (e) {
    return e.message;
  }
}

/**
 * @param {Object} variables
 * @param {[string, string][]} dataSet
 * @param {PEG.Parser} parser
 */
const errorCase = (variables, dataSet, parser) => {
  dataSet.forEach(([input, message]) => {
    it(input, () => {
      assert.deepStrictEqual(validate(parser, input, variables), message);
      assert.deepStrictEqual(invoke(parser, input, variables), message);
    });
  });
};

/**
 * @param {Object} variables
 * @param {[string, *][]} dataSet
 * @param {PEG.Parser} parser
 */
const normalCase = (variables, dataSet, parser) => {
  dataSet.forEach(([input, result]) => {
    it(input, () => {
      assert.deepStrictEqual(validate(parser, input, variables), true);
      assert.deepStrictEqual(invoke(parser, input, variables), result);
    });
  })
}

module.exports.errorCase = errorCase;
module.exports.normalCase = normalCase;
