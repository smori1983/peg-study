const parser = require('./format3');
const Builder = require('./format3-builder');
const ItemContainer = require('../reporting/item-container');
const Output = require('./format3-output');

class Format3Reporter {
  constructor() {
    /**
     * @private
     */
    this._options = {
      placeholder_mark: '#',
      bracket_open: '{',
      bracket_close: '}',
    };
  }

  /**
   * @param {ItemContainer} itemContainer
   * @param {string} text
   * @return {Output}
   */
  createReport(itemContainer, text) {
    const parsed = parser.parse(text, this._options);
    const reports = new Builder().build(parsed);

    const output = new Output();

    reports.forEach((report) => {
      report.getCodes().forEach((code) => {
        try {
          const item = itemContainer.getItem(code);
          const result = report.evaluate(item);
          output.addLine(result.getContent());
        } catch (e) {}
      });
    });

    return output;
  }
}

module.exports = Format3Reporter;
