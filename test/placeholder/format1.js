const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/placeholder/format1');
const Scope = require('../../src/placeholder/evaluation/scope');
const evaluator = require('../../src/placeholder/evaluation/evaluator');

describe('placeholder - format1', () => {
  const dataSet = [
    {
      notation: '{...}',
      option: {
        placeholder_bracket_open: '{',
        placeholder_bracket_close: '}',
      },
      variables: {
        v: 'v',
        value1: 'value1',
      },
      ok: [
        ['{v}', 'v'],
        ['{value1}', 'value1'],
        ['{ v }', 'v'],
        ['{ value1 }', 'value1'],
      ],
      ng: [
        ['!{v}'],
        ['!{value1}'],
        ['{!v}'],
        ['{!value1}'],
        ['{v!}'],
        ['{value1!}'],
        ['{v}!'],
        ['{value1}!'],
      ],
    },
    {
      notation: '${...}',
      option: {
        placeholder_bracket_open: '${',
        placeholder_bracket_close: '}',
      },
      variables: {
        v: 'v',
        value2: 'value2',
      },
      ok: [
        ['${v}', 'v'],
        ['${value2}', 'value2'],
        ['${ v }', 'v'],
        ['${ value2 }', 'value2'],
      ],
      ng: [
        ['!${v}'],
        ['!${value2}'],
        ['$!{v}'],
        ['$!{value2}'],
        ['${!v}'],
        ['${!value2}'],
        ['${v!}'],
        ['${value2!}'],
        ['${v}!'],
        ['${value2}!'],
      ],
    },
    {
      notation: '{{...}}',
      option: {
        placeholder_bracket_open: '{{',
        placeholder_bracket_close: '}}',
      },
      variables: {
        v: 'v',
        value3: 'value3',
      },
      ok: [
        ['{{v}}', 'v'],
        ['{{value3}}', 'value3'],
        ['{{ v }}', 'v'],
        ['{{ value3 }}', 'value3'],
      ],
      ng: [
        ['!{{v}}'],
        ['!{{value3}}'],
        ['{!{v}}'],
        ['{!{value3}}'],
        ['{{!v}}'],
        ['{{!value3}}'],
        ['{{v!}}'],
        ['{{value3!}}'],
        ['{{v}!}'],
        ['{{value3}!}'],
        ['{{v}}!'],
        ['{{value3}}!'],
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
