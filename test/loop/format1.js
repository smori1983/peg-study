const {describe, it} = require('mocha');
const assert = require('assert');
const parser = require('../../src/loop1/format1');

describe('loop - format1', () => {
  describe('parse', () => {
    it('pattern1', () => {
      const input = [
        'for(item in items) {',
        '  log(item)',
        '}',
      ].join('\n');

      const ast = {
        "type": "root",
        "text": "root",
        "children": [
          {
            "type": "builtin",
            "text": "for",
            "array": {
              "type": "variable",
              "text": "items"
            },
            "variable": {
              "type": "variable",
              "text": "item"
            },
            "children": [
              {
                "type": "builtin",
                "text": "log",
                "variable": {
                  "type": "variable",
                  "text": "item"
                }
              }
            ]
          }
        ]
      };

      assert.deepStrictEqual(parser.parse(input), ast);
    });

    it('pattern2', () => {
      const input = [
        'for(b in a) {',
        '  for(c in b) {',
        '    log(c)',
        '  }',
        '}',
      ].join('\n');

      const ast = {
        "type": "root",
        "text": "root",
        "children": [
          {
            "type": "builtin",
            "text": "for",
            "array": {
              "type": "variable",
              "text": "a"
            },
            "variable": {
              "type": "variable",
              "text": "b"
            },
            "children": [
              {
                "type": "builtin",
                "text": "for",
                "array": {
                  "type": "variable",
                  "text": "b"
                },
                "variable": {
                  "type": "variable",
                  "text": "c"
                },
                "children": [
                  {
                    "type": "builtin",
                    "text": "log",
                    "variable": {
                      "type": "variable",
                      "text": "c"
                    }
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
});
