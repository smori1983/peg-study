const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/placeholder/format2');
const Scope = require('../../src/placeholder/evaluation/scope');
const evaluator = require('../../src/placeholder/evaluation/evaluator');

describe('placeholder - format2', () => {
  const dataSet = [
    {
      notation: '#{...}',
      option: {
        placeholder_mark: '#',
        bracket_open: '{',
        bracket_close: '}',
      },
      variables: {
        v: 'v',
        value1: 'value1',
      },
      ok: [
        ['#{v}', 'v'],
        ['#{value1}', 'value1'],
        ['#{ v }', 'v'],
        ['#{ value1 }', 'value1'],
      ],
      ng: [
        ['# {v}'],
        ['# {value}'],
        ['##{v}'],
        ['##{value}'],
        ['#(v)'],
        ['#(value)'],
        ['${v}'],
        ['${value}'],
      ],
    },
    {
      notation: '$[...]',
      option: {
        placeholder_mark: '$',
        bracket_open: '[',
        bracket_close: ']',
      },
      variables: {
        v: 'v',
        value1: 'value1',
      },
      ok: [
        ['$[v]', 'v'],
        ['$[value1]', 'value1'],
        ['$[ v ]', 'v'],
        ['$[ value1 ]', 'value1'],
      ],
      ng: [
        ['$$[v]'],
        ['$$[value]'],
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
