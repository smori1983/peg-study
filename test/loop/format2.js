const {describe, it} = require('mocha');
const assert = require('assert');
const parser = require('../../src/loop2/format2');
const Debug = require('../../src/loop2/format2-debug');
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
        "type": "root",
        "text": "root",
        "children": [
          {
            "type": "builtin",
            "text": "log",
            "args": [
              {
                "type": "variable",
                "text": "data",
                "methods": [
                  {
                    "type": "method",
                    "text": "upper",
                    "args": []
                  },
                  {
                    "type": "method",
                    "text": "lower",
                    "args": []
                  }
                ]
              }
            ]
          },
          {
            "type": "builtin",
            "text": "for",
            "array": {
              "type": "variable",
              "text": "data",
              "methods": [
                {
                  "type": "method",
                  "text": "split",
                  "args": [
                    {
                      "type": "string",
                      "text": "-"
                    }
                  ]
                }
              ]
            },
            "variable": {
              "type": "variable",
              "text": "part"
            },
            "children": [
              {
                "type": "builtin",
                "text": "log",
                "args": [
                  {
                    "type": "variable",
                    "text": "part",
                    "methods": [
                      {
                        "type": "method",
                        "text": "upper",
                        "args": []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };

      assert.deepStrictEqual(parser.parse(input), ast);
    });
  });

  describe('debug', () => {
    it('pattern1', () => {
      const input = [
        'log(data.upper().lower())',
        'for(part in data.split("-").join("_").split("_")) {',
        '  log(part.upper())',
        '}',
      ].join('\n');

      const scope = new Scope();
      scope.addVariable('data', 'a-b-c');

      const debug = new Debug();

      const output = [
        'a-b-c',
        'A',
        'B',
        'C',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('pattern2', () => {
      const input = [
        'log(value.split(separator.lower()).join("_"))',
      ].join('\n');

      const scope = new Scope();
      scope.addVariable('value', 'a-b-c');
      scope.addVariable('separator', '-');

      const debug = new Debug();

      const output = [
        'a_b_c',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('pattern3', () => {
      const input = [
        "log(value.split(separator.lower()).join('_'))",
      ].join('\n');

      const scope = new Scope();
      scope.addVariable('value', 'a-b-c');
      scope.addVariable('separator', '-');

      const debug = new Debug();

      const output = [
        'a_b_c',
      ];

      assert.deepStrictEqual(debug.get(input, scope).getLines(), output);
    });

    it('pattern4', () => {
      const input = [
        'log(config.version)',
        'log(value.split(config.separator.lower()).join("#"))',
      ].join('\n');

      const scope = new Scope();
      scope.addVariable('value', 'a-b-c');
      scope.addVariable('config', {version: '1.0.0', separator: '-'});

      const debug = new Debug();

      const output = [
        '1.0.0',
        'a#b#c',
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

      const scope = new Scope();
      scope.addVariable('data1', ['a', 'b', 'c']);
      scope.addVariable('data2', ['x', 'y', 'z']);

      const debug = new Debug();

      assert.throws(() => {
        debug.get(input, scope);
      }, /variable not found: item1/);
    });
  });
});
