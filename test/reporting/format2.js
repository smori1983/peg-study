const {describe, it} = require('mocha');
const assert = require('assert');
const ItemContainer = require('../../src/reporting/item-container');
const Item = require('../../src/reporting/item');
const Reporter = require('../../src/reporting2/format2-reporter');

describe('reporting - format2', () => {
  describe('output', () => {
    it('pattern1', () => {
      const itemContainer = new ItemContainer();
      itemContainer.addItems([
        new Item('100', 'item01', 100),
        new Item('200', 'item02', 200),
        new Item('300', 'item03', 300),
      ]);

      const text = [
        'report {',
        '  code {',
        '    100',
        '    300',
        '  }',
        '  output {',
        '    "[#{code}]"',
        '    "- #{name}: #{amount}"',
        '  }',
        '}',
        'report {',
        '  code {',
        '    200',
        '  }',
        '  output {',
        '    "[#{code}]"',
        '    "- #{name} = #{amount}"',
        '  }',
        '}',
      ].join('\n');

      const expected = [
        '[100]',
        '- item01: 100',
        '[300]',
        '- item03: 300',
        '[200]',
        '- item02 = 200',
      ].join('\n');

      const actual = new Reporter().output(itemContainer, text).trim();

      assert.deepStrictEqual(actual, expected);
    });
  });
});
