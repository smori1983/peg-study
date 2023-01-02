const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/condition/format1');
const Scope = require('../../src/condition/evaluation/scope');
const evaluator = require('../../src/condition/evaluation/evaluator');

describe('condition - evaluation - condition', () => {
  describe('without parent', () => {
    const variables = {
      c1: 10,
      c2: 'foo',
      c3: {
        key1: 1,
        key2: {
          key1: false,
        },
      },
    };

    const dataSet = [
      ['c1 == 10 && c2 == "foo"', true],
      ['c1 != 10 && c2 == "foo"', false],
      ['c1 >= 10 && c2 == "foo"', true],
      ['c1 > 10 && c2 == "foo"', false],
      ['c1 <= 10 && c2 == "foo"', true],
      ['c1 < 10 && c2 == "foo"', false],

      ['c3.key1 == 1 && c2 == "foo"', true],
      ['c3.key1 != 1 && c2 == "foo"', false],
      ['c3.key1 >= 1 && c2 == "foo"', true],
      ['c3.key1 > 1 && c2 == "foo"', false],
      ['c3.key1 <= 1 && c2 == "foo"', true],
      ['c3.key1 < 1 && c2 == "foo"', false],

      ['c1 == 10 && c3.key1 == 1 && c3.key2.key1 == false', true],
      ['c1 == 10 && c3.key1 == 1 && c3.key2.key1 != false', false],
      ['c1 == 10 && c3.key1 != 1 && c3.key2.key1 == false', false],
      ['c1 == 10 && c3.key1 != 1 && c3.key2.key1 != false', false],
      ['c1 != 10 && c3.key1 == 1 && c3.key2.key1 == false', false],
      ['c1 != 10 && c3.key1 == 1 && c3.key2.key1 != false', false],
      ['c1 != 10 && c3.key1 != 1 && c3.key2.key1 == false', false],
      ['c1 != 10 && c3.key1 != 1 && c3.key2.key1 != false', false],

      ['c1 == 10 || c2 == "foo"', true],
      ['c1 != 10 || c2 == "foo"', true],
      ['c1 >= 10 || c2 == "foo"', true],
      ['c1 > 10 || c2 == "foo"', true],
      ['c1 <= 10 || c2 == "foo"', true],
      ['c1 < 10 || c2 == "foo"', true],

      ['c3.key1 == 1 || c2 == "foo"', true],
      ['c3.key1 != 1 || c2 == "foo"', true],
      ['c3.key1 >= 1 || c2 == "foo"', true],
      ['c3.key1 > 1 || c2 == "foo"', true],
      ['c3.key1 <= 1 || c2 == "foo"', true],
      ['c3.key1 < 1 || c2 == "foo"', true],

      ['c1 == 10 || c3.key1 == 1 || c3.key2.key1 == false', true],
      ['c1 == 10 || c3.key1 == 1 || c3.key2.key1 != false', true],
      ['c1 == 10 || c3.key1 != 1 || c3.key2.key1 == false', true],
      ['c1 == 10 || c3.key1 != 1 || c3.key2.key1 != false', true],
      ['c1 != 10 || c3.key1 == 1 || c3.key2.key1 == false', true],
      ['c1 != 10 || c3.key1 == 1 || c3.key2.key1 != false', true],
      ['c1 != 10 || c3.key1 != 1 || c3.key2.key1 == false', true],
      ['c1 != 10 || c3.key1 != 1 || c3.key2.key1 != false', false],

      ['(c1 == 10 || c2 == "bar") && (c3.key1 == 1 || c3.key2.key1 == true)', true],
      ['(c1 == 99 || c2 == "foo") && (c3.key1 == 9 || c3.key2.key1 == false)', true],
      ['(c1 == 99 || c2 == "bar") && (c3.key1 == 9 || c3.key2.key1 == true)', false],
    ];

    dataSet.forEach(([expression, result], index) => {
      it('evaluate condition: case ' + (index + 1), () => {
        const scope = new Scope(variables);
        const ast = parser.parse(expression);

        assert.deepStrictEqual(evaluator.runCondition(ast, scope), result);
      });
    });
  });
});
