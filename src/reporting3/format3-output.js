class Format3Output {
  constructor() {
    /**
     * @type {string[]}
     * @private
     */
    this._lines = [];
  }

  /**
   * @param {string} line
   */
  addLine(line) {
    this._lines.push(line);
  }

  /**
   * @return {string}
   */
  getContent() {
    return this.getLines().join('\n');
  }

  /**
   * @return {string[]}
   */
  getLines() {
    return this._lines;
  }
}

module.exports = Format3Output;
