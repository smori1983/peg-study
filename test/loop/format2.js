const {describe, it} = require('mocha');
const assert = require('assert');
const Debug = require('./debug');

const parser = require('../../src/loop/format2');
const Scope = require('../../src/loop/scope');

describe('loop - format2', () => {
  describe('ok', () => {
    const dataSet = [
      {
        name: 'log() and for()',
        input: [
          'log(data.upper().lower())',
          'for(part in data.split("-").join("_").split("_")) {',
          '  log(part.upper())',
          '}',
        ],
        variables: {
          data: 'a-b-c',
        },
        output: [
          'a-b-c',
          'A',
          'B',
          'C',
        ],
      },
      {
        name: 'string double quote',
        input: [
          'log(value.split(separator.lower()).join("_"))',
          'log(value.split(separator.lower()).join(""))',
        ],
        variables: {
          value: 'a-b-c',
          separator: '-',
        },
        output: [
          'a_b_c',
          'abc',
        ],
      },
      {
        name: 'string single quote',
        input: [
          "log(value.split(separator.lower()).join('_'))",
          "log(value.split(separator.lower()).join(''))",
        ],
        variables: {
          value: 'a-b-c',
          separator: '-',
        },
        output: [
          'a_b_c',
          'abc',
        ],
      },
      {
        name: 'resolve property',
        input: [
          'log(config.version)',
          'log(value.split(config.separator.lower()).join("#"))',
        ],
        variables: {
          value: 'a-b-c',
          config: {
            version: '1.0.0',
            separator: '-',
          },
        },
        output: [
          '1.0.0',
          'a#b#c',
        ],
      },
      {
        name: 'sort()',
        input: [
          'for (item in value.split("-").sort()) {',
          '  log(item)',
          '}',
        ],
        variables: {
          value: 'z-a-A-20-10',
        },
        output: [
          '10',
          '20',
          'A',
          'a',
          'z',
        ],
      },
      {
        name: 'trim()',
        input: [
          'log(value.trim())',
        ],
        variables: {
          value: ' abc ',
        },
        output: [
          'abc',
        ],
      },
      {
        name: 'replace()',
        input: [
          'log(value.replace("", "="))',
          'log(value.replace(" ", "="))',
          'log(value.replace("-", "="))',
          'log(value.replace("-", "=").replace("=", "#"))',
          'log(value.replace("a", "A"))',
          'log(value.replace("-", "-"))',
          'log(value.replace("-", "--"))',
          'log(value.replace("-", "---").replace("--", "++"))',
          'log(value.replace("-", ""))',
        ],
        variables: {
          value: 'a-b-c',
        },
        output: [
          'a-b-c',
          'a-b-c',
          'a=b=c',
          'a#b#c',
          'A-b-c',
          'a-b-c',
          'a--b--c',
          'a++-b++-c',
          'abc',
        ],
      },
      {
        name: 'filter()',
        input: [
          'log(values.filter(">", 200).join("_"))',
          'log(values.filter("<", 200).join("_"))',
          'log(values.filter(">=", 200).join("_"))',
          'log(values.filter("<=", 200).join("_"))',
          'log(values.filter("=", 200).join("_"))',
          'log(values.filter("!=", 200).join("_"))',
        ],
        variables: {
          values: [100, 200, 300],
        },
        output: [
          '300',
          '100',
          '200_300',
          '100_200',
          '200',
          '100_300',
        ],
      },
    ];

    dataSet.forEach((set) => {
      it(set.name, () => {
        const scope = new Scope(set.variables);
        const debug = new Debug(parser);

        assert.deepStrictEqual(debug.get(set.input.join('\n'), scope).getLines(), set.output);
      });
    });
  });

  describe('error', () => {
    const dataSet = [
      {
        name: 'scope',
        input: [
          'for(item1 in data1) {',
          '  log(item1)',
          '}',
          'for(item2 in data2) {',
          '  log(item1)',
          '}',
        ],
        variables: {
          data1: ['a', 'b', 'c'],
          data2: ['x', 'y', 'z'],
        },
        message: /variable not found: item1/,
      }
    ];

    dataSet.forEach((set) => {
      it(set.name, () => {
        const scope = new Scope(set.variables);
        const debug = new Debug(parser);

        assert.throws(() => {
          debug.get(set.input.join('\n'), scope);
        }, set.message);
      });
    });
  });
});
