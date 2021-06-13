const chalk = require('chalk');
const mcw = require('monospace-char-width');
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

        let offset = 0;
        for (let i = 0; i < this._error.location.start.column - 1; i++) {
          offset += this._charSize(line, i);
        }
        for (let i = 0; i < offset; i++) {
          message += '-';
        }
        message += '^';

        result.push(message);
      }
    });

    return result.join('\n');
  }

  /**
   * @returns {string}
   */
  asTerminal() {
    const result = [];
    const lines = this._text.split(/[\r\n]+/);

    const numOfDigits = lines.length.toString().length;
    const format = sprintf('%%0%sd| %%s', numOfDigits);

    let before, target, after;
    lines.forEach((line, index) => {
      if (index === (this._error.location.start.line - 1)) {
        before = chalk.green(line.slice(0, this._error.location.start.column - 1));
        if (this._error.location.start.column >= line.length) {
          target = chalk.red('[*]');
        } else {
          target = chalk.red(line.charAt(this._error.location.start.column - 1));
        }
        after = chalk.green(line.slice(this._error.location.start.column));

        result.push(sprintf(format, index + 1, before + target + after));
      } else {
        result.push(sprintf(format, index + 1, line));
      }
    });

    return result.join('\n');
  }

  /**
   * @param {string} text
   * @param {number} position
   * @return {number}
   * @private
   */
  _charSize(text, position) {
    return mcw(text.charCodeAt(position), position > 0 ? text.charCodeAt(position - 1) : 0);
  }
}

module.exports = ErrorReporter;
