const {describe, it} = require('mocha');
const assert = require('assert');
const parser = require('../../src/loop/format1');

describe('loop - format1', () => {
  describe('parse', () => {
    it('pattern1', () => {
      const input = [
        'for(item in items) {',
        '  log(item)',
        '}',
      ].join('\n');

      const ast = {
        type: 'root',
        text: 'root',
        attributes: {},
        children: [
          {
            type: 'builtin',
            text: 'loop',
            attributes: {
              array: {
                type: 'variable',
                text: 'items',
                attributes: {},
                children: [],
              },
              variable: {
                type: 'variable',
                text: 'item',
                attributes: {},
                children: [],
              },
            },
            children: [
              {
                type: 'builtin',
                text: 'log',
                attributes: {
                  argument: {
                    type: 'variable',
                    text: 'item',
                    attributes: {},
                    children: [],
                  },
                },
                children: [],
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
        type: 'root',
        text: 'root',
        attributes: {},
        children: [
          {
            type: 'builtin',
            text: 'loop',
            attributes: {
              array: {
                type: 'variable',
                text: 'a',
                attributes: {},
                children: [],
              },
              variable: {
                type: 'variable',
                text: 'b',
                attributes: {},
                children: [],
              },
            },
            children: [
              {
                type: 'builtin',
                text: 'loop',
                attributes: {
                  array: {
                    type: 'variable',
                    text: 'b',
                    attributes: {},
                    children: [],
                  },
                  variable: {
                    type: 'variable',
                    text: 'c',
                    attributes: {},
                    children: [],
                  },
                },
                children: [
                  {
                    type: 'builtin',
                    text: 'log',
                    attributes: {
                      argument: {
                        type: 'variable',
                        text: 'c',
                        attributes: {},
                        children: [],
                      },
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      };

      assert.deepStrictEqual(parser.parse(input), ast);
    });
  });
});
