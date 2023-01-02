const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/placeholder/format3');
const Scope = require('../../src/placeholder/evaluation/scope');
const evaluator = require('../../src/placeholder/evaluation/evaluator');

describe('placeholder - format3', () => {
  const dataSet = [
    {
      notation: '#{...}',
      option: {
        placeholder_mark: '#',
        bracket_open: '{',
        bracket_close: '}',
      },
      variables: {
        v: 'a',
        value1: 'b',
        value2: 'c',
      },
      ok: [
        ['#{v}', 'a'],
        ['#{value1}', 'b'],
        ['#{value2}', 'c'],
        ['hello, #{v}', 'hello, a'],
        ['hello, #{value1}', 'hello, b'],
        ['hello, ##{v}', 'hello, #a'],
        ['hello, ##{value1}', 'hello, #b'],
        ['hello, # #{v}', 'hello, # a'],
        ['hello, # #{value1}', 'hello, # b'],
        ['hello, # {v}', 'hello, # {v}'],
        ['hello, # {value1}', 'hello, # {value1}'],
        ['#hello, #{v}', '#hello, a'],
        ['#hello, #{value1}', '#hello, b'],
        ['hello, #{v}#', 'hello, a#'],
        ['hello, #{value1}#', 'hello, b#'],
        ['hello, #{v} #', 'hello, a #'],
        ['hello, #{value1} #', 'hello, b #'],
        ['#[test] #{v}', '#[test] a'],
        ['#[test] #{value1}', '#[test] b'],
        ['#{v} #{value1} #{value2}', 'a b c'],
      ],
      ng: [
      ],
    },
  ];

  dataSet.forEach((set) => {
    describe(`notation: ${set.notation}`, () => {
      set.ok.forEach(([input, result], index) => {
        it('should parse: case ' + (index + 1), () => {
          const scope = new Scope(set.variables);
          const ast = parser.parse(input, set.option);
          const output = evaluator.run(ast, scope);

          assert.deepStrictEqual(output, result);
        });
      });

      set.ng.forEach(([input], index) => {
        it('should not parse: case ' + (index + 1), () => {
          assert.throws(() => {
            parser.parse(input, set.option);
          }, Error);
        });
      });
    });
  });
});
