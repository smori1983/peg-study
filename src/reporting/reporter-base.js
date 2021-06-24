const Builder = require('./builder');
const ItemContainer = require('./item-container');
const Output = require('./output');

class ReporterBase {
  /**
   * @param {PEG.Parser} parser
   * @param {Object} options
   */
  constructor(parser, options) {
    /**
     * @private
     */
    this._parser = parser;

    /**
     * @private
     */
    this._options = options;
  }

  /**
   * @param {ItemContainer} itemContainer
   * @param {string} text
   * @return {Output}
   */
  createReport(itemContainer, text) {
    const parsed = this._parser.parse(text, this._options);
    const reports = new Builder().build(parsed);

    const output = new Output();

    reports.forEach((report) => {
      report.getCodes().forEach((code) => {
        try {
          const item = itemContainer.getItem(code);
          const result = report.evaluate(item);

          output.merge(result);
        } catch (e) {}
      });
    });

    return output;
  }
}

module.exports = ReporterBase;
