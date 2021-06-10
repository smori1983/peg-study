const parser = require('./format2');
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
 * @property {Format2AstOutput[]} children
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
      bracket_open: '(',
      bracket_close: ')',
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
      const reportOutput = new Output();

      report.code.forEach((code) => {
        const item = itemContainer.getItem(code);
        const codeOutput = new Output();

        report.output.forEach((line) => {
          const lineOutputs = [];

          line.children.forEach((lineItem) => {
            if (lineItem.type === 'variable') {
              if (lineItem.text === 'code') {
                lineOutputs.push(item.getCode());
              } else if (lineItem.text === 'name') {
                lineOutputs.push(item.getName());
              } else if (lineItem.text === 'amount') {
                lineOutputs.push(item.getAmount());
              }
            } else if (lineItem.type === 'plain') {
              lineOutputs.push(lineItem.text);
            }
          });

          codeOutput.addLine(lineOutputs.join(''));
        });

        reportOutput.merge(codeOutput);
      });

      output.merge(reportOutput);
    });

    return output.getContent();
  }
}

module.exports = Format2Reporter;
