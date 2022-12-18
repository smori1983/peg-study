const {describe, it} = require('mocha');
const assert = require('assert');

const calc1Parser = require('../../src/calc/calc1');
const calc2Parser = require('../../src/calc/calc2');
const evaluator = require('../../src/calc/evaluation/evaluator');

describe('evaluation', () => {
  describe('calc1', () => {
    const dataSet = [
      ['1', 1],

      ['1 + 2', 3],
      ['1 - 2', -1],
      ['1 * 2', 2],
      ['1 / 2', 0.5],

      ['1 + 2 + 3', 6],
      ['1 - 2 - 3', -4],
      ['1 * 2 * 3', 6],
      ['1 / 2 / 3', 1 / 6],

      ['((1 + 2) + 3) + 4', 10],
      ['1 + ((2 + 3) + 4)', 10],

      ['((1 - 2) - 3) - 4', -8],
      ['1 - ((2 - 3) - 4)', 6],
    ];

    dataSet.forEach(([input, output]) => {
      it('evaluator', () => {
        const ast = calc1Parser.parse(input);

        const result = evaluator.run(ast);

        assert.deepStrictEqual(result, output);
      });
    });
  });

  describe('calc2', () => {
    /**
     * @type {[string,Object,number][]}
     */
    const dataSet = [
      ['a + 1', {a: 1}, 2],
      ['b - 1', {b: 1}, 0],
      ['value / max * 100', {value: 10, max: 50}, 20],
    ];

    dataSet.forEach(([input, variables, output]) => {
      it ('evaluator', () => {
        const ast = calc2Parser.parse(input);

        const result = evaluator.run(ast, variables);

        assert.deepStrictEqual(result, output);
      });
    });
  });
});
