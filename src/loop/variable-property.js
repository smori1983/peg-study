const sprintf = require('sprintf-js').sprintf;
const Scope = require('./scope');
const Value = require('./value');

class VariableProperty {
  /**
   * @param {string} key
   */
  constructor(key) {
    this._key = key;
  }

  /**
   * @param {Scope} scope
   * @param {Value} receiver
   * @return {Value}
   * @throws {Error}
   */
  evaluate(scope, receiver) {
    if (receiver.getType() !== 'object') {
      throw new Error('receiver should be an object');
    }

    /**
     * @type {Object}
     */
    const value = receiver.getValue();

    if (value.hasOwnProperty(this._key)) {
      return new Value(value[this._key]);
    }

    throw new Error(sprintf('property not found: %s', this._key));
  }
}

module.exports = VariableProperty;
