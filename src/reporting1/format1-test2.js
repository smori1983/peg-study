const ItemContainer = require('../reporting/item-container');
const Item = require('../reporting/item');
const Reporter = require('./format1-reporter');

const itemContainer = new ItemContainer();
itemContainer.addItems([
  new Item('100', 'item01', 13),
  new Item('200', 'item02', 45),
  new Item('300', 'item03', 54),
]);

const reportText = `
report {
  code {
    100
    300
  }
  output {
    "[$code]"
    "- $name: $amount"
  }
}
`;

const reporter = new Reporter();
console.log(reporter.output(itemContainer, reportText.trim()));
