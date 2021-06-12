const sprintf = require('sprintf-js').sprintf;

/**
 * @typedef {Object} PegSyntaxError
 * @property {string} message
 * @property {(PegSyntaxExpectedLiteral|PegSyntaxExpectedClass|PegSyntaxExpectedAny|PegSyntaxExpectedEnd|PegSyntaxExpectedOther)[]} expected
 * @property {string} found
 * @property {PegSyntaxLocation} location
 * @property {string} name 'SyntaxError'
 */

/**
 * @typedef {Object} PegSyntaxExpectedLiteral
 * @property {string} type 'literal'
 * @property {string} text
 * @property {boolean} ignoreCase
 */

/**
 * @typedef {Object} PegSyntaxExpectedClass
 * @property {string} type 'class'
 * @property {string[]} parts
 * @property {boolean} inverted
 * @property {boolean} ignoreCase
 */

/**
 * @typedef {Object} PegSyntaxExpectedAny
 * @property {string} type 'any'
 */

/**
 * @typedef {Object} PegSyntaxExpectedEnd
 * @property {string} type 'end'
 */

/**
 * @typedef {Object} PegSyntaxExpectedOther
 * @property {string} type
 * @property {string} description
 */

/**
 * @typedef {Object} PegSyntaxLocation
 * @property {{offset:number, line:number, column:number}} start
 * @property {{offset:number, line:number, column:number}} end
 */

class ErrorReporter {
  /**
   * @param {string} text
   * @param {PegSyntaxError} e
   */
  constructor(text, e) {
    /**
     * @type {string}
     * @private
     */
    this._text = text;

    /**
     * @type {PegSyntaxError}
     * @private
     */
    this._error = e;
  }

  /**
   * @returns {string}
   */
  asPlainText() {
    const result = [];
    const lines = this._text.split(/[\r\n]+/);

    const numOfDigits = lines.length.toString().length;
    const format = sprintf('%%0%sd| %%s', numOfDigits);

    lines.forEach((line, index) => {
      result.push(sprintf(format, index + 1, line));

      if (index === (this._error.location.start.line - 1)) {
        let message = '';

        for (let i = 0; i < numOfDigits; i++) {
          message += ' ';
        }
        message += '| ';

        for (let i = 0; i < this._error.location.start.offset; i++) {
          message += '-';
        }
        message += '^';

        result.push(message);
      }
    });

    return result.join('\n');
  }
}

module.exports = ErrorReporter;
