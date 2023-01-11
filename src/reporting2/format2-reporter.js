const parser = require('./format2');
const Item = require('../reporting/item');
const ItemContainer = require('../reporting/item-container');
const Output = require('../reporting/output');

/**
 * @typedef {Object} Format2AstReport
 * @property {string[]} code
 * @property {Format2AstOutput[]} output
 */

/**
 * @typedef {Object} Format2AstOutput
 * @property {string} type
 * @property {string} text
 * @property {Format2AstOutputComponent[]} children
 */

/**
 * @typedef {Object} Format2AstOutputComponent
 * @property {string} type
 * @property {string} text
 */

class Format2Reporter {
  constructor() {
    this._options = {
      placeholder_mark: '#',
      placeholder_bracket_open: '{',
      placeholder_bracket_close: '}',
    };
  }

  /**
   * @param {ItemContainer} itemContainer
   * @param {string} text
   * @returns {string}
   */
  output(itemContainer, text) {
    /**
     * @type {Format2AstReport[]}
     */
    const parsed = parser.parse(text, this._options);

    const output = new Output();

    parsed.forEach((report) => {
      output.merge(this._createOutputOfReport(report, itemContainer));
    });

    return output.getContent();
  }

  /**
   * @param {Format2AstReport} report
   * @param {ItemContainer} itemContainer
   * @return {Output}
   * @private
   */
  _createOutputOfReport(report, itemContainer) {
    const result = new Output();

    report.code.forEach((code) => {
      try {
        result.merge(this._createOutputOfItem(report.output, itemContainer.getItem(code)));
      } catch (e) {}
    });

    return result;
  }

  /**
   * @param {Format2AstOutput[]} reportOutput
   * @param {Item} item
   * @return {Output}
   * @private
   */
  _createOutputOfItem(reportOutput, item) {
    const result = new Output();

    reportOutput.forEach((line) => {
      result.addLine(this._createLine(line, item));
    });

    return result;
  }

  /**
   * @param {Format2AstOutput} line
   * @param {Item} item
   * @return {string}
   * @private
   */
  _createLine(line, item) {
    const outputs = [];

    line.children.forEach((lineItem) => {
      if (lineItem.type === 'variable') {
        if (lineItem.text === 'code') {
          outputs.push(item.getCode());
        } else if (lineItem.text === 'name') {
          outputs.push(item.getName());
        } else if (lineItem.text === 'amount') {
          outputs.push(item.getAmount());
        }
      } else if (lineItem.type === 'plain') {
        outputs.push(lineItem.text);
      }
    });

    return outputs.join('');
  }
}

module.exports = Format2Reporter;
