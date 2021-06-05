const MethodQueueItem = require('./method-queue-item');

class MethodQueue {
  /**
   * @param {MethodQueueItem[]} items
   */
  constructor(items) {
    this._items = items;
  }

  /**
   * @return {MethodQueueItem[]}
   */
  getItems() {
    return this._items;
  }
}

module.exports = MethodQueue;
