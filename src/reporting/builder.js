const Node = require('./node');
const NodeRoot = require('./node-root');
const NodeForLoop = require('./node-for-loop');
const NodeOutputLine = require('./node-output-line');
const Report = require('./report');
const Value = require('./value');
const Variable = require('./variable');

/**
 * @typedef {Object} AstNode
 * @property {string} type
 * @property {string} text
 * @property {Object} attributes
 * @property {AstNode[]} children
 */

class Builder {
  /**
   * @param {AstNode[]} astReports
   * @return {Report[]}
   */
  build(astReports) {
    const result = [];

    astReports.forEach((astReport) => {
      const codes = astReport.attributes.code.children.map((astCode) => astCode.text);

      const root = new NodeRoot();
      astReport.attributes.output.children.forEach((astOutput) => {
        this._build(root, astOutput);
      });

      result.push(new Report(codes, root));
    });

    return result;
  }

  /**
   * @param {Node} parentNode
   * @param {AstNode} astNode
   * @private
   */
  _build(parentNode, astNode) {
    if (astNode.type === 'builtin') {
      if (astNode.text === 'output_line') {
        this._buildOutput(parentNode, astNode);
      } else if (astNode.text === 'loop') {
        this._buildLoop(parentNode, astNode);
      }
    }
  }

  /**
   * @param {Node} parentNode
   * @param {AstNode} astNode
   * @private
   */
  _buildOutput(parentNode, astNode) {
    const outputLine = new NodeOutputLine();

    astNode.children.forEach((child) => {
      if (child.type === 'string') {
        outputLine.addComponent(new Value(child.text));
      } else if (child.type === 'variable') {
        outputLine.addComponent(new Variable(child.text));
      }
    });

    parentNode.addChild(outputLine);
  }

  /**
   * @param {Node} parentNode
   * @param {AstNode} astNode
   * @private
   */
  _buildLoop(parentNode, astNode) {
    const array = new Variable(astNode.attributes.array.text);
    const variable = new Variable(astNode.attributes.variable.text);
    const forLoop = new NodeForLoop(array, variable);

    astNode.children.forEach((child) => {
      this._build(forLoop, child);
    });

    parentNode.addChild(forLoop);
  }
}

module.exports = Builder;
