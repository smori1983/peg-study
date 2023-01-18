/**
 * @typedef {import('./output')} Output
 * @typedef {import('./scope')} Scope
 * @typedef {import('./visitor')} Visitor
 */

const Output = require('./output');
const VisitorCondition = require('./visitor-condition');
const VisitorEmptyLine = require('./visitor-empty-line');
const VisitorLoop = require('./visitor-loop');
const VisitorOutputLine = require('./visitor-output-line');

class Processor {
  constructor() {
    /**
     * @type {Visitor[]}
     * @private
     */
    this._visitors = [
      new VisitorCondition(),
      new VisitorLoop(),
      new VisitorOutputLine(),
      new VisitorEmptyLine(),
    ];
  }

  /**
   * @param {Object} node
   * @param {Scope} scope
   * @return {Output}
   */
  process(node, scope) {
    const output = new Output();

    node.children.forEach((child) => {
      this.visit(child, scope, output);
    });

    return output;
  }

  /**
   * @param {Object} node
   * @param {Scope} scope
   * @param {Output} output
   */
  visit(node, scope, output) {
    const visitor = this._getVisitor(node);

    visitor.visit(node, scope, output, this);
  }

  /**
   * @param {Object} node
   * @return {Visitor}
   * @protected
   */
  _getVisitor(node) {
    for (let i = 0; i < this._visitors.length; i++) {
      /**
       * @type {Visitor}
       */
      const visitor = this._visitors[i];

      if (visitor.supports(node)) {
        return visitor;
      }
    }

    throw new Error(`Visitor not found for ${node.type} (${node.text})`);
  }
}

module.exports = Processor;
