class Item {
  /**
   * @param {string} code
   * @param {string} name
   * @param {number} amount
   * @param {string[]} [comments]
   */
  constructor(code, name, amount, comments) {
    this._code = code;
    this._name = name;
    this._amount = amount;
    this._comments = comments || [];
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

  /**
   * @return {string[]}
   */
  getComments() {
    return this._comments;
  }
}

module.exports = Item;
