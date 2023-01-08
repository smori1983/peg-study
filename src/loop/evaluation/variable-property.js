const sprintf = require('sprintf-js').sprintf;
const Value = require('./value');
const VariableChain = require('./variable-chain');

class VariableProperty extends VariableChain {
  /**
   * @param {string} key
   */
  constructor(key) {
    super();

    /**
     * @type {string}
     * @private
     */
    this._key = key;
  }

  evaluate(receiver, scope) {
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
