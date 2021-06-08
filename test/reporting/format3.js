const {describe, it} = require('mocha');
const assert = require('assert');
const ItemContainer = require('../../src/reporting/item-container');
const Item = require('../../src/reporting/item');
const Reporter = require('../../src/reporting3/format3-reporter');

describe('reporting - format3', () => {
  describe('output', () => {
    it('pattern1', () => {
      const itemContainer = new ItemContainer();
      itemContainer.addItems([
        new Item('100', 'item01', 100, ['xxx', 'yyy']),
        new Item('200', 'item02', 200),
        new Item('300', 'item03', 300, ['zzz']),
      ]);

      const text = [
        'report {',
        '  code {',
        '    100',
        '    200',
        '  }',
        '  output {',
        '    "[code:#{code}]"',
        '    "#{name}:#{amount}"',
        '    for (comment in comments) {',
        '      "- #{comment}"',
        '    }',
        '  }',
        '}',
        'report {',
        '  code {',
        '    300',
        '  }',
        '  output {',
        '    "[code:#{code}]"',
        '    "name:#{name}"',
        '    "amount:#{amount}"',
        '  }',
        '}',
      ].join('\n');

      const output = new Reporter().createReport(itemContainer, text);

      const expected = [
        '[code:100]',
        'item01:100',
        '- xxx',
        '- yyy',
        '[code:200]',
        'item02:200',
        '[code:300]',
        'name:item03',
        'amount:300',
      ];

      assert.deepStrictEqual(output.getLines(), expected);
    });
  });
});
