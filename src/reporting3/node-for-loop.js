const Node = require('./node');
const Scope = require('../reporting/scope');
const Variable = require('./variable');

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
    const array = value.get();

    for (let i = 0; i < array.length; i++) {
      const childScope = new Scope(scope);
      childScope.addVariable(this._variable.getName(), array[i]);

      this._children.forEach((child) => {
        child.evaluate(childScope, output);
      });
    }
  }
}

module.exports = NodeForLoop;
