//const MethodQueue = require('./method-queue');
const Scope = require('./scope');

class Variable2 {
  /**
   * @param {string} name
   * @param {MethodQueue} queue
   */
  constructor(name, queue) {
    this._name = name;
    this._queue = queue;
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
  evaluate(scope) {
    const receiver = scope.resolveVariable(this._name);

    return this._queue.consume(scope, receiver);
  }
}

module.exports = Variable2;
