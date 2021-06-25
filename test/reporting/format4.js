const {describe, it} = require('mocha');
const assert = require('assert');
const ItemContainer = require('../../src/reporting/item-container');
const Item = require('../../src/reporting/item');
const Reporter = require('../../src/reporting4/format4-reporter');

describe('reporting - format4', () => {
  describe('output', () => {
    it('pattern1', () => {
      const itemContainer = new ItemContainer();
      itemContainer.addItems([
        new Item('100', 'item01', 100, ['xxx', 'yyy']),
        new Item('200', 'item02', 200, ['zzz']),
      ]);

      const text = [
        'report {',
        '  code {',
        '    100',
        '    200',
        '  }',
        '  output {',
        '    "# code:#{code} {#{name},#{amount}}"',
        '    for (comment in comments) {',
        '      "- #{comment}"',
        '    }',
        '  }',
        '}',
      ].join('\n');

      const output = new Reporter().createReport(itemContainer, text);

      const expected = [
        '# code:100 {item01,100}',
        '- xxx',
        '- yyy',
        '# code:200 {item02,200}',
        '- zzz',
      ];

      assert.deepStrictEqual(output.getLines(), expected);
    });

    it('pattern2', () => {
      const itemContainer = new ItemContainer();
      itemContainer.addItems([
        new Item('100', 'item01', 100),
        new Item('200', 'item02', 200),
      ]);

      const text = [
        'report {',
        '  code {',
        '    100',
        '    200',
        '  }',
        '  output {',
        '    "- ##{amount}#"', // double quote
        "    '- ##{amount}#'", // single quote
        '  }',
        '}',
      ].join('\n');

      const output = new Reporter().createReport(itemContainer, text);

      const expected = [
        '- #100#',
        '- #100#',
        '- #200#',
        '- #200#',
      ];

      assert.deepStrictEqual(output.getLines(), expected);
    });
  });
});
