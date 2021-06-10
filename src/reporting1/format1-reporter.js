const ItemContainer = require('../reporting/item-container');
const parser = require('./format1');

/**
 * @typedef {Object} Format1AstReport
 * @property {string[]} code
 * @property {Format1AstOutput[]} output
 */

/**
 * @typedef {Object} Format1AstOutput
 * @property {string} type
 * @property {string} text
 * @property {Format1AstOutput[]} children
 */

/**
 * @typedef {Object} Format1AstOutputComponent
 * @property {string} type
 * @property {string} text
 */

class Format1Reporter {
  /**
   * @param {ItemContainer} itemContainer
   * @param {string} text
   * @returns {string}
   */
  output(itemContainer, text) {
    /**
     * @type {Format1AstReport[]}
     */
    const parsed = parser.parse(text);

    const outputLines = [];

    parsed.forEach((report) => {
      const codes = report.code;

      const outputs = report.output;

      const reportOutputLines = [];

      codes.forEach((code) => {
        const item = itemContainer.getItem(code);

        const codeOutputLines = [];

        outputs.forEach((line) => {
          const lineOutputLines = [];

          line.children.forEach((lineItem) => {
            if (lineItem.type === 'variable') {
              if (lineItem.text === 'code') {
                lineOutputLines.push(item.getCode());
              } else if (lineItem.text === 'name') {
                lineOutputLines.push(item.getName());
              } else if (lineItem.text === 'amount') {
                lineOutputLines.push(item.getAmount());
              }
            } else if (lineItem.type === 'plain') {
              lineOutputLines.push(lineItem.text);
            }
          });

          codeOutputLines.push(lineOutputLines.join(''));
        });

        reportOutputLines.push(codeOutputLines.join('\n'));
      });

      outputLines.push(reportOutputLines.join('\n'));
    });

    return outputLines.join('\n');
  }
}

module.exports = Format1Reporter;
