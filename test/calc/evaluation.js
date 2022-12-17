const {describe, it} = require('mocha');
const assert = require('assert');

const calc1Parser = require('../../src/calc/calc1');
const evaluator = require('../../src/calc/evaluation/evaluator');

describe('evaluation', () => {
  const dataSet = [
    ['1', 1],

    ['1 + 2', 3],
    ['1 - 2', -1],
    ['1 * 2', 2],
    ['1 / 2', 0.5],

    ['1 + 2 + 3', 6],
    ['1 - 2 - 3', -4],
    ['1 * 2 * 3', 6],
    ['1 / 2 / 3', 1/6],

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
