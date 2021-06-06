const Scope = require('./scope');

class Variable {
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name;

    /**
     * @type {MethodQueueItem[]}
     * @private
     */
    this._methodChain = [];
  }

  /**
   * @param {MethodQueueItem} item
   */
  addMethod(item) {
    this._methodChain.push(item);
  }

  /**
   * @return {string}
   */
  getName() {
    return this._name;
  }

  /**
   * @param {Scope} scope
   * @return {*}
   */
  resolve(scope) {
    let receiver = scope.resolveVariable(this._name);

    this._methodChain.forEach((item) => {
      receiver = item.evaluate(scope, receiver);
    });

    return receiver;
  }
}

module.exports = Variable;
