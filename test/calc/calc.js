const {describe, it} = require('mocha');
const assert = require('assert');
const Calc = require('../../src/calc/calc');

describe('calc', () => {
  describe('without placeholder - misc patterns', () => {
    it('1+2+3*4=15', () => {
      const result = new Calc().calc('1+2+3*4');

      assert.deepStrictEqual(result, 15);
    });

    it('(1)=1', () => {
      const result = new Calc().calc('(1)');

      assert.deepStrictEqual(result, 1);
    });

    it('(((1-1)))=0', () => {
      const result = new Calc().calc('(((1-1)))');

      assert.deepStrictEqual(result, 0);
    });
  })

  describe('use placeholder - additive', () => {
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
      const result = new Calc().calc('$value_1 + $value_2', {
        value_1: 1,
        value_2: 2,
      });

      assert.deepStrictEqual(result, 3);
    });

    it('placeholder - placeholder', () => {
      const result = new Calc().calc('$left - $right', {
        left: 1,
        right: 2,
      });

      assert.deepStrictEqual(result, -1);
    });
  });
});