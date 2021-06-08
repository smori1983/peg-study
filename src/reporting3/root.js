const Node = require('./node');

class Root extends Node {
  evaluate(scope, output) {
    this._children.forEach((child) => {
      child.evaluate(scope, output);
    });
  }
}

module.exports = Root;
