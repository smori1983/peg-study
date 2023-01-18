/**
 * @typedef {import('./item-container')} ItemContainer
 */

const parser = require('../reporting4/format4');
const Output = require('./output');
const Processor = require('./processor');
const Scope = require('./scope');

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
    const output = new Output();
    const processor = new Processor();

    try {
      const reports = this._parser.parse(text, this._options);

      reports.forEach((report) => {
        const codes = report.attributes.code.children
          .filter((node) => node.type === 'string')
          .map((node) => node.text);

        codes.forEach((code) => {
          const item = itemContainer.getItem(code);
          const scope = new Scope({
            code: item.getCode(),
            name: item.getName(),
            amount: item.getAmount(),
            comments: item.getComments(),
          });

          const result = processor.process(report.attributes.output, scope);

          output.merge(result);
        })
      });

      return output;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Reporter;
