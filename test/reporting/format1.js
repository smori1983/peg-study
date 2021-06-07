const {describe, it} = require('mocha');
const assert = require('assert');
const ItemContainer = require('../../src/reporting/item-container');
const Item = require('../../src/reporting/item');
const Reporter = require('../../src/reporting1/format1-reporter');

describe('reporting - format1', () => {
  describe('output', () => {
    it('pattern1', () => {
      const itemContainer = new ItemContainer();
      itemContainer.addItems([
        new Item('100', 'item01', 13),
        new Item('200', 'item02', 45),
        new Item('300', 'item03', 54),
      ]);

      const text = [
        'report {',
        '  code {',
        '    100',
        '    300',
        '  }',
        '  output {',
        '    "[$code]"',
        '    "- $name: $amount"',
        '  }',
        '}',
      ].join('\n');

      const expected = [
        '[100]',
        '- item01: 13',
        '[300]',
        '- item03: 54',
      ].join('\n');

      const actual = new Reporter().output(itemContainer, text).trim();

      assert.deepStrictEqual(actual, expected);
    });
  });
});
