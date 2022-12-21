/**
 * @typedef {Object} RuntimeErrorLocation
 * @property {{offset:number, line:number, column:number}} start
 * @property {{offset:number, line:number, column:number}} end
 */

class RuntimeError extends Error {
  /**
   * @param {string} message
   * @param {RuntimeErrorLocation} location
   */
  constructor(message, location) {
    super(message);
    this.location = location;
  }

}

module.exports = RuntimeError;
