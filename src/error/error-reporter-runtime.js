const chalk = require('chalk');
const mcw = require('monospace-char-width');
const sprintf = require('sprintf-js').sprintf;

class ErrorReporterRuntime {
  /**
   * @param {string} text
   * @param {RuntimeError} e
   */
  constructor(text, e) {
    /**
     * @private
     */
    this._text = text;

    /**
     * @private
     */
    this._error = e;
  }

  /**
   * @return {string}
   */
  getOriginalMessage() {
    return this._error.message;
  }

  /**
   * @returns {string}
   */
  getCodeAsPlainText() {
    const result = [];
    const lines = this._text.split(/[\r\n]+/);

    const numOfDigits = lines.length.toString().length;
    const separator = '| ';
    const format = sprintf('%%0%dd%s%%s', numOfDigits, separator);

    lines.forEach((line, index) => {
      result.push(sprintf(format, index + 1, line));

      if (index === (this._error.location.start.line - 1)) {
        let message = '';

        message += ' '.repeat(numOfDigits);
        message += separator;

        let offset = 0;
        for (let i = 0; i < this._error.location.start.column - 1; i++) {
          offset += this._charSize(line, i);
        }
        message += '-'.repeat(offset);
        message += '^';

        result.push(message);
      }
    });

    return result.join('\n');
  }

  /**
   * @returns {string}
   */
  getCodeAsTerminal() {
    const result = [];
    const lines = this._text.split(/[\r\n]+/);

    const numOfDigits = lines.length.toString().length;
    const separator = '| ';
    const format = sprintf('%%0%dd%s%%s', numOfDigits, separator);

    lines.forEach((line, index) => {
      if (index === (this._error.location.start.line - 1)) {
        let before, target, after;

        before = chalk.green(line.slice(0, this._error.location.start.column - 1));
        if (this._error.location.start.column > line.length) {
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
   * @return {PegSyntaxCodeAnnotatedLine[]}
   */
  getCodeAsAnnotatedData() {
    const result = [];
    const lines = this._text.split(/[\r\n]+/);

    const numOfDigits = lines.length.toString().length;
    const lineNoFormat = sprintf('%%0%dd', numOfDigits);

    lines.forEach((line, index) => {
      const lineData = {
        line: sprintf(lineNoFormat, index + 1),
        text: [],
      };

      if (index === (this._error.location.start.line - 1)) {
        if (this._error.location.start.column > 0) {
          lineData.text.push({
            type: 'normal',
            value: line.slice(0, this._error.location.start.column - 1),
          });
        }
        if (this._error.location.start.column > line.length) {
          lineData.text.push({
            type: 'error',
            value: '',
          });
        } else {
          lineData.text.push({
            type: 'error',
            value: line.charAt(this._error.location.start.column - 1),
          });
          lineData.text.push({
            type: 'normal',
            value: line.slice(this._error.location.start.column),
          });
        }
      } else {
        lineData.text.push({
          type: 'normal',
          value: line,
        });
      }

      result.push(lineData);
    });

    return result;
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

module.exports = ErrorReporterRuntime;
