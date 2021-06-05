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
    let receiver = scope.resolveVariable(this._name);

    this._queue.getItems().forEach((item) => {
      receiver = item.evaluate(scope, receiver);
    });

    return receiver;
  }
}

module.exports = Variable2;
