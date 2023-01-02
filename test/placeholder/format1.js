const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/placeholder/format1');

describe('placeholder - format1', () => {
  const dataSet = [
    {
      notation: '{...}',
      option: {
        delimiter_open: '{',
        delimiter_close: '}',
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
        delimiter_open: '${',
        delimiter_close: '}',
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
        delimiter_open: '{{',
        delimiter_close: '}}',
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
          const ast = parser.parse(input, set.option);

          assert.deepStrictEqual(ast.text, result);
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
