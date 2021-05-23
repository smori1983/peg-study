const SymbolParent = require('./symbol-parent');

class Root extends SymbolParent {
  constructor() {
    super();
  }

  evaluate(scope) {
    this._children.forEach((child) => {
      child.evaluate(scope);
    });
  }
}

module.exports = Root;
