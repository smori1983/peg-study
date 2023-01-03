const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/placeholder/format4');
const Scope = require('../../src/placeholder/evaluation/scope');
const evaluator = require('../../src/placeholder/evaluation/evaluator');

describe('placeholder - format4', () => {
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
        [['#{v}'], ['a']],
        [['#{value1}'], ['b']],
        [['hello, #{v}', 'hello, #{value1}'], ['hello, a', 'hello, b']],
        [['hello, ##{v}', 'hello, ##{value1}'], ['hello, #a', 'hello, #b']],
        [['hello, # #{v}', 'hello, # #{value1}'], ['hello, # a', 'hello, # b']],
        [['hello, # {v}', 'hello, # {value1}'], ['hello, # {v}', 'hello, # {value1}']],
        [['#hello, #{v}', '#hello, #{value1}'], ['#hello, a', '#hello, b']],
        [['hello, #{v}#', 'hello, #{value1}#'], ['hello, a#', 'hello, b#']],
        [['hello, #{v} #', 'hello, #{value1} #'], ['hello, a #', 'hello, b #']],
        [['#[test] #{v}', '#[test] #{value1}'], ['#[test] a', '#[test] b']],
        [['#{v}', '#{value1}', '#{value2}'], ['a', 'b', 'c']],
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
          const ast = parser.parse(input.join('\n'), set.option);
          const outputs = [];

          ast.forEach((node) => {
            outputs.push(evaluator.run(node, scope));
          });

          assert.deepStrictEqual(outputs, result);
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
