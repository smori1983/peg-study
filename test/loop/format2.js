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
        'for(part in data.split("-")) {',
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
  });
});
