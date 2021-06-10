class Output {
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
   * @param {Output} output
   */
  merge(output) {
    output.getLines().forEach((line) => {
      this.addLine(line);
    });
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
