const {describe, it} = require('mocha');
const assert = require('assert');
const MethodManager = require('../../src/method/evaluation/method-manager');
const Scope = require('../../src/method/evaluation/scope');
const parser = require('../../src/method/format1');

const variables = {
  code: 'ABC-123-xyz',
  amount: 999,
  rate: 0.9,
};

const validate = (input) => {
  try {
    new MethodManager().validate(parser.parse(input), new Scope(variables));
    return true;
  } catch (e) {
    return e.message;
  }
};

const invoke = (input) => {
  try {
    return new MethodManager().invoke(parser.parse(input), new Scope(variables));
  } catch (e) {
    return e.message;
  }
}

describe('method - MethodManager', () => {
  describe('error case', () => {
    const dataSet = [
      ['foo', 'variable not found: foo'],
      ['code.foo()', 'method not found: foo'],
      ['amount.upper()', 'number cannot use method upper'],
      ['code.upper(true)', 'number of arguments of method upper should be 0'],
      ['code.split()', 'number of arguments of method split should be 1'],
      ['code.split("-", true)', 'number of arguments of method split should be 1'],
      ['code.split(3)', 'argument type does not match for method split'],
      ['code.split("-").lower()', 'array cannot use method lower'],
      ['code.upper().split("-").join("_").join("*")', 'string cannot use method join'],
    ];

    dataSet.forEach(([input, message]) => {
      it(input, () => {
        assert.deepStrictEqual(validate(input), message);
        assert.deepStrictEqual(invoke(input), message);
      });
    });
  });

  describe('normal case', () => {
    const dataSet = [
      ['code', 'ABC-123-xyz'],
      ['amount', 999],
      ['rate', 0.9],
      ['code.upper()', 'ABC-123-XYZ'],
      ['code.split("-").join("_").split("_").join("-").upper()', 'ABC-123-XYZ'],
      ["code.split('-').join('_').split('_').join('-').upper()", 'ABC-123-XYZ'],
    ];

    dataSet.forEach(([input, result]) => {
      it(input, () => {
        assert.deepStrictEqual(validate(input), true);
        assert.deepStrictEqual(invoke(input), result);
      });
    });
  });
});
