const Reporter = require('./format3-reporter');
const ItemContainer = require('../reporting/item-container');
const Item = require('../reporting/item');

/**
 * @param {ItemContainer} itemContainer
 * @param {string} input
 */
const dump = (itemContainer, input) => {
  const reporter = new Reporter();
  const result = reporter.createReport(itemContainer, input);

  console.log(result.getContent());
};

const itemContainer = new ItemContainer();
itemContainer.addItems([
  new Item('100', 'item01', 10, ['xxx', 'yyy', 'zzz']),
  new Item('200', 'item02', 20),
  new Item('300', 'item03', 30),
]);

const input1 = `
report {
  code {
    100
    200
  }
  output {
    "[code:#{code}]"
    "#{name}:#{amount}"
    for (comment in comments) {
      "- #{comment}"
    }
  }
}
`.trim();

dump(itemContainer, input1);
