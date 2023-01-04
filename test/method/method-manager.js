const {describe} = require('mocha');
const runner = require('./runner');

const format1Parser = require('../../src/method/format1');
const format2Parser = require('../../src/method/format2');

describe('method - MethodManager', () => {
  describe('format1', () => {
    const variables = {
      code: 'ABC-123-xyz',
      amount: 999,
      rate: 0.9,
    };

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

      runner.errorCase(variables, dataSet, format1Parser);
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

      runner.normalCase(variables, dataSet, format1Parser);
    });
  });

  describe('format2', () => {
    const variables = {
      amount: 999,
      key1: 'ABC-123-xyz',
      key2: {
        name: 'DEF-999-xyz',
        amount: 100,
      },
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

      runner.errorCase(variables, dataSet, format2Parser);
    });

    describe('normal case', () => {
      const dataSet = [
        ['amount', 999],
        ['key1', 'ABC-123-xyz'],
        ['key2.name', 'DEF-999-xyz'],
        ['key2.amount', 100],
        ['key1.upper()', 'ABC-123-XYZ'],
        ['key1.split("-").join("_").split("_").join("-").upper()', 'ABC-123-XYZ'],
        ["key1.split('-').join('_').split('_').join('-').upper()", 'ABC-123-XYZ'],
      ];

      runner.normalCase(variables, dataSet, format2Parser);
    });
  });
});
