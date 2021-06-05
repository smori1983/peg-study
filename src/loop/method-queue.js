const MethodQueueItem = require('./method-queue-item');
const Scope = require('./scope');

class MethodQueue {
  /**
   * @param {MethodQueueItem[]} items
   */
  constructor(items) {
    this._items = items;
  }

  /**
   * @param {Scope} scope
   * @param {*} receiver
   * @return {*}
   */
  consume(scope, receiver) {
    let result = receiver;

    this._items.forEach((item) => {
      result = item.evaluate(scope, result);
    });

    return result;
  }
}

module.exports = MethodQueue;
