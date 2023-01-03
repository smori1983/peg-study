const {describe, it} = require('mocha');
const assert = require('assert');
const parser = require('../../src/loop/format2');
const Debug = require('../../src/loop/format2-debug');
const Scope = require('../../src/loop/scope');

describe('loop - format2', () => {
  describe('parse', () => {
    it('pattern1', () => {
      const input = [
        'log(data.upper().lower())',
        'for(part in data.split("-")) {',
        '  log(part.upper())',
        '}',
      ].join('\n');

      const ast = {
        type: 'root',
        text: 'root',
        attributes: {},
        children: [
          {
            type: 'builtin',
            text: 'log',
            attributes: {
              arguments: [
                {
                  type: 'variable',
                  text: 'data',
                  attributes: {
                    methods: [
                      {
                        type: 'method',
                        text: 'upper',
                        attributes: {
                          arguments: [],
                        },
                        children: [],
                      },
                      {
                        type: 'method',
                        text: 'lower',
                        attributes: {
                          arguments: [],
                        },
                        children: [],
                      },
                    ],
                  },
                  children: [],
                },
              ],
            },
            children: [],
          },
          {
            type: 'builtin',
            text: 'loop',
            attributes: {
              array: {
                type: 'variable',
                text: 'data',
                attributes: {
                  methods: [
                    {
                      type: 'method',
                      text: 'split',
                      attributes: {
                        arguments: [
                          {
                            type: 'string',
                            text: '-',
                            attributes: {},
                            children: [],
                          },
                        ],
                      },
                      children: [],
                    },
                  ],
                },
                children: [],
              },
              variable: {
                type: 'variable',
                text: 'part',
                attributes: {},
                children: [],
              },
            },
            children: [
              {
                type: 'builtin',
                text: 'log',
                attributes: {
                  arguments: [
                    {
                      type: 'variable',
                      text: 'part',
                      attributes: {
                        methods: [
                          {
                            type: 'method',
                            text: 'upper',
                            attributes: {
                              arguments: [],
                            },
                            children: [],
                          },
                        ],
                      },
                      children: [],
                    },
                  ],
                },
                children: [],
              },
            ],
          },
        ],
      };

      assert.deepStrictEqual(parser.parse(input), ast);
    });
  });

  describe('debug', () => {
    it('log() and for()', () => {
      const input = [
        'log(data.upper().lower())',
        'for(part in data.split("-").join("_").split("_")) {',
        '  log(part.upper())',
        '}',
      ].join('\n');

      const scope = new Scope({
        data: 'a-b-c',
      });

      const debug = new Debug();

      const output = [
        'a-b-c',
        'A',
        'B',
        'C',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('string double quote', () => {
      const input = [
        'log(value.split(separator.lower()).join("_"))',
        'log(value.split(separator.lower()).join(""))',
      ].join('\n');

      const scope = new Scope({
        value: 'a-b-c',
        separator: '-',
      });

      const debug = new Debug();

      const output = [
        'a_b_c',
        'abc',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('string single quote', () => {
      const input = [
        "log(value.split(separator.lower()).join('_'))",
        "log(value.split(separator.lower()).join(''))",
      ].join('\n');

      const scope = new Scope({
        value: 'a-b-c',
        separator: '-',
      });

      const debug = new Debug();

      const output = [
        'a_b_c',
        'abc',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('resolve property', () => {
      const input = [
        'log(config.version)',
        'log(value.split(config.separator.lower()).join("#"))',
      ].join('\n');

      const scope = new Scope({
        value: 'a-b-c',
        config: {
          version: '1.0.0',
          separator: '-',
        },
      });

      const debug = new Debug();

      const output = [
        '1.0.0',
        'a#b#c',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('sort()', () => {
      const input = [
        'for (item in value.split("-").sort()) {',
        '  log(item)',
        '}',
      ].join('\n');

      const scope = new Scope({
        value: 'z-a-A-20-10',
      });

      const debug = new Debug();

      const output = [
        '10',
        '20',
        'A',
        'a',
        'z',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('trim()', () => {
      const input = [
        'log(value.trim())',
      ].join('\n');

      const scope = new Scope({
        value: ' abc ',
      });

      const debug = new Debug();

      const output = [
        'abc',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('replace()', () => {
      const input = [
        'log(value.replace("", "="))',
        'log(value.replace(" ", "="))',
        'log(value.replace("-", "="))',
        'log(value.replace("-", "=").replace("=", "#"))',
        'log(value.replace("a", "A"))',
        'log(value.replace("-", "-"))',
        'log(value.replace("-", "--"))',
        'log(value.replace("-", "---").replace("--", "++"))',
        'log(value.replace("-", ""))',
      ].join('\n');

      const scope = new Scope({
        value: 'a-b-c',
      });

      const debug = new Debug();

      const output = [
        'a-b-c',
        'a-b-c',
        'a=b=c',
        'a#b#c',
        'A-b-c',
        'a-b-c',
        'a--b--c',
        'a++-b++-c',
        'abc',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('filter()', () => {
      const input = [
        'log(values.filter(">", 200).join("_"))',
        'log(values.filter("<", 200).join("_"))',
        'log(values.filter(">=", 200).join("_"))',
        'log(values.filter("<=", 200).join("_"))',
        'log(values.filter("=", 200).join("_"))',
        'log(values.filter("!=", 200).join("_"))',
      ].join('\n');

      const scope = new Scope({
        values: [100, 200, 300],
      });

      const debug = new Debug();

      const output = [
        '300',
        '100',
        '200_300',
        '100_200',
        '200',
        '100_300',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });
  });

  describe('debug - error', () => {
    it('pattern1', () => {
      const input = [
        'for(item1 in data1) {',
        '  log(item1)',
        '}',
        'for(item2 in data2) {',
        '  log(item1)',
        '}',
      ].join('\n');

      const scope = new Scope({
        data1: ['a', 'b', 'c'],
        data2: ['x', 'y', 'z'],
      });

      const debug = new Debug();

      assert.throws(() => {
        debug.get(input, scope);
      }, /variable not found: item1/);
    });
  });
});
