const MethodQueueItem = require('./method-queue-item');
const Scope = require('./scope');

class MethodQueue {
  constructor() {
    /**
     * @type {MethodQueueItem[]}
     * @private
     */
    this._items = [];
  }

  /**
   * @param {MethodQueueItem} item
   */
  add(item) {
    this._items.push(item);
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
