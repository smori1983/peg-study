/**
 * @typedef {import('./item')} Item
 */

class ItemContainer {
  constructor() {
    /**
     * @type {Item[]}
     */
    this._items = [];
  }

  /**
   * @param {Item[]} items
   */
  addItems(items) {
    items.forEach((item) => {
      this.addItem(item);
    });
  }

  /**
   * @param {Item} item
   */
  addItem(item) {
    this._items.push(item);
  }

  /**
   * @return {Item[]}
   */
  getItems() {
    return this._items;
  }

  /**
   * @param {string} code
   * @return {Item}
   */
  getItem(code) {
    for (let i = 0; i < this._items.length; i++) {
      if (this._items[i].getCode() === code) {
        return this._items[i];
      }
    }

    throw new Error('item not found.');
  }
}

module.exports = ItemContainer;
