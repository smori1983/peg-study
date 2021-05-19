const {describe, it} = require('mocha');
const assert = require('assert');
const MethodManager = require('../../src/method/method-manager');
const parser = require('../../src/method/format1');

describe('MethodManager', () => {
  const validate = (input) => {
    try {
      new MethodManager().validate(variables, parser.parse(input));
      return true;
    } catch (e) {
      return e.message;
    }
  };

  const invoke = (input) => {
    try {
      return new MethodManager().invoke(variables, parser.parse(input));
    } catch (e) {
      return e.message;
    }
  }

  const variables = {
    code: 'ABC-123-xyz',
    amount: 999,
  };

  describe('error', () => {
    it('foo', () => {
      const input = 'foo';
      const message = 'variable not registered: foo';
      assert.deepStrictEqual(validate(input), message);
      assert.deepStrictEqual(invoke(input), message);
    });

    it('code.foo()', () => {
      const input = 'code.foo()';
      const message = 'method not found: foo';
      assert.deepStrictEqual(validate(input), message);
      assert.deepStrictEqual(invoke(input), message);
    });

    it('amount.upper()', () => {
      const input = 'amount.upper()';
      const message = 'number cannot use method upper';
      assert.deepStrictEqual(validate(input), message);
      assert.deepStrictEqual(invoke(input), message);
    });

    it('code.upper(true)', () => {
      const input = 'code.upper(true)';
      const message = 'number of arguments of method upper should be 0';
      assert.deepStrictEqual(validate(input), message);
      assert.deepStrictEqual(invoke(input), message);
    });

    it('code.split()', () => {
      const input = 'code.split()';
      const message = 'number of arguments of method split should be 1';
      assert.deepStrictEqual(validate(input), message);
      assert.deepStrictEqual(invoke(input), message);
    });

    it('code.split("-", true)', () => {
      const input = 'code.split("-", true)';
      const message = 'number of arguments of method split should be 1';
      assert.deepStrictEqual(validate(input), message);
      assert.deepStrictEqual(invoke(input), message);
    });

    it('code.split(3)', () => {
      const input = 'code.split(3)';
      const message = 'argument type does not match for method split';
      assert.deepStrictEqual(validate(input), message);
      assert.deepStrictEqual(invoke(input), message);
    });

    it('code.split("-").lower()', () => {
      const input = 'code.split("-").lower()';
      const message = 'array cannot use method lower';
      assert.deepStrictEqual(validate(input), message);
      assert.deepStrictEqual(invoke(input), message);
    });

    it('code.upper().split("-").join("_").join("*")', () => {
      const input = 'code.upper().split("-").join("_").join("*")';
      const message = 'string cannot use method join';
      assert.deepStrictEqual(validate(input), message);
      assert.deepStrictEqual(invoke(input), message);
    });
  });

  describe('normal', () => {
    it('code', () => {
      const input = 'code';
      assert.deepStrictEqual(validate(input), true);
      assert.deepStrictEqual(invoke(input), 'ABC-123-xyz');
    });

    it('code.upper()', () => {
      const input = 'code.upper()';
      assert.deepStrictEqual(validate(input), true);
      assert.deepStrictEqual(invoke(input), 'ABC-123-XYZ');
    });

    it('code.split("-").join("_").split("_").join("-").upper()', () => {
      const input = 'code.split("-").join("_").split("_").join("-").upper()';
      assert.deepStrictEqual(validate(input), true);
      assert.deepStrictEqual(invoke(input), 'ABC-123-XYZ');
    });
  });
});
