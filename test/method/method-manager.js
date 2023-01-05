const {describe} = require('mocha');
const runner = require('./runner');

const format3Parser = require('../../src/method/format3');

describe('method - MethodManager', () => {
  describe('format3', () => {
    const variables = {
      amount: 999,
      key1: 'ABC-123-xyz',
      key2: {
        name: 'AAA-999-BBB',
        amount: 100,
      },
      config: {
        delimiter1: '-',
        delimiter2: '_',
        delimiter3: 'X',
      }
    };

    describe('error case', () => {
      const dataSet = [
        ['foo', 'variable not found: foo'],
        ['key1.foo()', 'method not found: foo'],
        ['key1.value', 'property not found: value'],
        ['key2.value', 'property not found: value'],
        ['amount.upper()', 'number cannot use method upper'],
        ['key1.upper(true)', 'number of arguments of method upper should be 0'],
        ['key1.split()', 'number of arguments of method split should be 1'],
        ['key1.split("-", true)', 'number of arguments of method split should be 1'],
        ['key1.split(3)', 'argument type does not match for method split'],
        ['key1.split("-").lower()', 'array cannot use method lower'],
        ['key1.upper().split("-").join("_").join("*")', 'string cannot use method join'],
      ];

      runner.errorCase(variables, dataSet, format3Parser);
    });

    describe('normal case', () => {
      const dataSet = [
        ['amount', 999],
        ['key1', 'ABC-123-xyz'],
        ['key2.name', 'AAA-999-BBB'],
        ['key2.amount', 100],
        ['key1.upper()', 'ABC-123-XYZ'],
        ['key1.split("-").join("_").split("_").join("-").upper()', 'ABC-123-XYZ'],
        ["key1.split('-').join('_').split('_').join('-').upper()", 'ABC-123-XYZ'],
        ['key2.name.split(config.delimiter1).join(config.delimiter2)', 'AAA_999_BBB'],
        ['key2.name.split(config.delimiter1).join(config.delimiter3.lower())', 'AAAx999xBBB'],
      ];

      runner.normalCase(variables, dataSet, format3Parser);
    });
  });
});
