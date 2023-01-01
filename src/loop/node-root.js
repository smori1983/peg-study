/**
 * @typedef {import('./scope')} Scope
 */

const Node = require('./node');

class NodeRoot extends Node {
  evaluate(scope, output) {
    this._children.forEach((child) => {
      child.evaluate(scope, output);
    });
  }
}

module.exports = NodeRoot;
