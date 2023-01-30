const {describe, it} = require('mocha');
const assert = require('assert');

const calc1Parser = require('../../src/calc/calc1');
const calc2Parser = require('../../src/calc/calc2');
const evaluator = require('../../src/calc/evaluation/evaluator');

describe('evaluation', () => {
  describe('calc1', () => {
    const dataSet = [
      ['0', 0],

      ['-0', -0],

      ['1', 1],

      ['-1', -1],

      ['1 + 2', 3],
      ['1 - 2', -1],
      ['1 * 2', 2],
      ['1 / 2', 0.5],

      ['-1 + 1', 0],
      ['1 + -1', 0],
      ['(-1) + 1', 0],
      ['1 + (-1)', 0],
      ['1 - -1', 2],
      ['1 - (-1)', 2],
      ['-1 * 1', -1],
      ['1 * -1', -1],
      ['-1 * -1', 1],
      ['1 / -1', -1],
      ['-1 / 1', -1],
      ['-1 / -1', 1],

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
     * @type {{input:string,variables:Object,output:number}[]}
     */
    const dataSet = [
      {
        input: 'a + 1',
        variables: {
          a: 1,
        },
        output: 2,
      },
      {
        input: 'a + 1',
        variables: {
          a: -10,
        },
        output: -9,
      },
      {
        input: 'b - 1',
        variables: {
          b: 1,
        },
        output: 0,
      },
      {
        input: '-3 + b',
        variables: {
          b: 1,
        },
        output: -2,
      },
      {
        input: 'b * (-3)',
        variables: {
          b: 2,
        },
        output: -6,
      },
      {
        input: 'b / (-3)',
        variables: {
          b: 9,
        },
        output: -3,
      },
      {
        input: 'value / max * 100',
        variables: {
          value: 10,
          max: 50,
        },
        output: 20,
      },
      {
        input: 'value * (100 + config.tax) / 100',
        variables: {
          value: 500,
          config: {
            tax: 15,
          },
        },
        output: 575,
      },
    ];

    dataSet.forEach((set) => {
      it ('evaluator', () => {
        const ast = calc2Parser.parse(set.input);

        const result = evaluator.run(ast, set.variables);

        assert.deepStrictEqual(result, set.output);
      });
    });
  });
});
