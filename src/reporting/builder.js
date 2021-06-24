const Node = require('./node');
const NodeRoot = require('./node-root');
const NodeForLoop = require('./node-for-loop');
const NodeOutputLine = require('./node-output-line');
const Report = require('./report');
const Value = require('./value');
const Variable = require('./variable');

/**
 * @typedef {Object} AstReport
 * @property {string[]} code
 * @property {AstOutput[]} output
 */

/**
 * @typedef {Object} AstOutput
 * @property {string} type
 * @property {string} text
 * @property {AstOutputComponent} [array]
 * @property {AstOutputComponent} [variable]
 * @property {AstOutput[]} children
 */

/**
 * @typedef {Object} AstOutputComponent
 * @property {string} type
 * @property {string} text
 */

class Builder {
  /**
   * @param {AstReport[]} astReports
   * @return {Report[]}
   */
  build(astReports) {
    const result = [];

    astReports.forEach((astReport) => {
      const root = new NodeRoot();

      astReport.output.forEach((astOutput) => {
        this._build(root, astOutput);
      });

      result.push(new Report(astReport.code, root));
    });

    return result;
  }

  /**
   * @param {Node} parentNode
   * @param {AstOutput} astOutput
   * @private
   */
  _build(parentNode, astOutput) {
    if (astOutput.type === 'builtin') {
      if (astOutput.text === 'output_line') {
        this._buildOutput(parentNode, astOutput);
      } else if (astOutput.text === 'for_loop') {
        this._buildForLoop(parentNode, astOutput);
      }
    }
  }

  /**
   * @param {Node} parentNode
   * @param {AstOutput} astOutput
   * @private
   */
  _buildOutput(parentNode, astOutput) {
    const outputLine = new NodeOutputLine();

    astOutput.children.forEach((child) => {
      if (child.type === 'plain') {
        outputLine.addComponent(new Value(child.text));
      } else if (child.type === 'variable') {
        outputLine.addComponent(new Variable(child.text));
      }
    });

    parentNode.addChild(outputLine);
  }

  /**
   * @param {Node} parentNode
   * @param {AstOutput} astOutput
   * @private
   */
  _buildForLoop(parentNode, astOutput) {
    const array = new Variable(astOutput.array.text);
    const variable = new Variable(astOutput.variable.text);
    const forLoop = new NodeForLoop(array, variable);

    astOutput.children.forEach((child) => {
      this._build(forLoop, child);
    });

    parentNode.addChild(forLoop);
  }
}

module.exports = Builder;
