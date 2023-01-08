class Output {
  constructor() {
    /**
     * @type {string[]}
     * @private
     */
    this._lines = [];
  }

  /**
   * @param {string} value
   */
  addLine(value) {
    this._lines.push(value);
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

module.exports = Output;
