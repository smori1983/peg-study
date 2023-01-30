const {describe, it} = require('mocha');
const assert = require('assert');
const ItemContainer = require('../../src/reporting/item-container');
const Item = require('../../src/reporting/item');
const Reporter = require('../../src/reporting/reporter');

describe('reporting - format4', () => {
  describe('ok', () => {
    const dataSet = require('./_data/format4_ok');

    dataSet.forEach((set, index) => {
      it('pattern ' + (index + 1), () => {
        const itemContainer = new ItemContainer();
        set.items.forEach(([code, name, amount, comments]) => {
          itemContainer.addItem(new Item(code, name, amount, comments));
        });

        const output = new Reporter().createReport(itemContainer, set.input.join('\n'));

        assert.deepStrictEqual(output.getLines(), set.output);
      });
    });
  });

  describe('error', () => {
    const dataSet =  require('./_data/format4_error');

    dataSet.forEach((set, index) => {
      it('pattern ' + (index + 1), () => {
        assert.throws(() => {
          const itemContainer = new ItemContainer();

          new Reporter().createReport(itemContainer, set.input.join('\n'));
        });
      });
    });
  });
});
