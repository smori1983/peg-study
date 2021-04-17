const {describe, it} = require('mocha');
const assert = require('assert');
const Calc = require('../src/calc');

describe('calc', () => {
  it('integer + placeholder', () => {
    const result = new Calc().calc('1 + $right', {
      right: 3,
    });

    assert.deepStrictEqual(result, 4);
  });

  it('placeholder + integer', () => {
    const result = new Calc().calc('$left + 3', {
      left: 2,
    });

    assert.deepStrictEqual(result, 5);
  });

  it('placeholder + placeholder', () => {
    const result = new Calc().calc('$left + $right', {
      left: 1,
      right: 2,
    });

    assert.deepStrictEqual(result, 3);
  });
});
