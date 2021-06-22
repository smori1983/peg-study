const Node = require('./node');
const Value = require('./value');
const Variable = require('./variable');

class NodeOutputLine extends Node {
  constructor() {
    super();

    /**
     * @type {(Value|Variable)[]}
     * @private
     */
    this._components = [];
  }

  /**
   * @param {(Value|Variable)} component
   */
  addComponent(component) {
    this._components.push(component);
  }

  evaluate(scope, output) {
    let line = [];

    this._components.forEach((component) => {
      if (component instanceof Value) {
        line.push(component.get());
      } else if (component instanceof Variable) {
        line.push(component.resolve(scope).get());
      }
    })

    output.addLine(line.join(''));
  }
}

module.exports = NodeOutputLine;
