/**
 * @typedef {import('./item-container')} ItemContainer
 */

const parser = require('../reporting4/format4');
const Builder = require('./builder');
const Output = require('./output');

class Reporter {
  constructor() {
    /**
     * @type {PEG.Parser}
     * @private
     */
    this._parser = parser;

    this._options = {
      placeholder_mark: '#',
      placeholder_bracket_open: '{',
      placeholder_bracket_close: '}',
    };
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

module.exports = Reporter;
