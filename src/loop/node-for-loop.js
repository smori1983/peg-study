/**
 * @typedef {import('./variable')} Variable
 */

const Node = require('./node');
const Scope = require('./scope');

class NodeForLoop extends Node {
  /**
   * @param {Variable} array
   * @param {Variable} variable
   */
  constructor(array, variable) {
    super();

    /**
     * @private
     */
    this._array = array;

    /**
     * @private
     */
    this._variable = variable;
  }

  evaluate(scope, output) {
    const value = this._array.resolve(scope);

    if (value.getType() !== 'array') {
      throw new Error(this._array.getName() + ' should be an array');
    }

    /**
     * @type {*[]}
     */
    const array = value.getValue();

    for (let i = 0; i < array.length; i++) {
      const variables = {};
      variables[this._variable.getName()] = array[i];

      const childScope = new Scope(variables, scope);

      this._children.forEach((child) => {
        child.evaluate(childScope, output);
      });
    }
  }
}

module.exports = NodeForLoop;
