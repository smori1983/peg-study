class Item {
  /**
   * @param {string} code
   * @param {string} name
   * @param {number} amount
   */
  constructor(code, name, amount) {
    this._code = code;
    this._name = name;
    this._amount = amount;
  }

  /**
   * @return {string}
   */
  getCode() {
    return this._code;
  }

  /**
   * @return {string}
   */
  getName() {
    return this._name;
  }

  /**
   * @return {number}
   */
  getAmount() {
    return this._amount;
  }
}

module.exports = Item;
