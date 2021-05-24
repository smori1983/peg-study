const SymbolParent = require('./symbol-parent');

class Root extends SymbolParent {
  constructor() {
    super();
  }

  evaluate(scope, output) {
    this._children.forEach((child) => {
      child.evaluate(scope, output);
    });
  }
}

module.exports = Root;
