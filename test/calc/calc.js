const {describe, it} = require('mocha');
const assert = require('assert');
const Calc = require('../../src/calc/calc');

const calc = (input, params) => {
  return new Calc().calc(input, params);
};

describe('calc', () => {
  describe('without placeholder - misc patterns', () => {
    it('1+2+3*4=15', () => {
      assert.deepStrictEqual(calc('1+2+3*4'), 15);
    });

    it('(1)=1', () => {
      assert.deepStrictEqual(calc('(1)'), 1);
    });

    it('(((1-1)))=0', () => {
      assert.deepStrictEqual(calc('(((1-1)))'), 0);
    });
  })

  describe('use placeholder - additive', () => {
    it('integer + placeholder', () => {
      assert.deepStrictEqual(calc('1 + $right', {right: 3}), 4);
    });

    it('placeholder + integer', () => {
      assert.deepStrictEqual(calc('$left + 3', {left: 2}), 5);
    });

    it('placeholder + placeholder', () => {
      assert.deepStrictEqual(calc('$value1 + $value2', {value1: 1, value2: 2}), 3);
    });

    it('placeholder - placeholder', () => {
      assert.deepStrictEqual(calc('$left - $right', {left: 1, right: 2}), -1);
    });
  });
});
