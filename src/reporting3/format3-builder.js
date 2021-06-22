const Node = require('../reporting/node');
const Report = require('./format3-report');
const Root = require('../reporting/node-root');
const ForLoop = require('../reporting/node-for-loop');
const OutputLine = require('../reporting/node-output-line');
const Value = require('../reporting/value');
const Variable = require('../reporting/variable');

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

class Format3Builder {
  /**
   * @param {AstReport[]} astReports
   * @return {Report[]}
   */
  build(astReports) {
    const result = [];

    astReports.forEach((astReport) => {
      const root = new Root();

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
    const outputLine = new OutputLine();

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
    const forLoop = new ForLoop(array, variable);

    astOutput.children.forEach((child) => {
      this._build(forLoop, child);
    });

    parentNode.addChild(forLoop);
  }
}

module.exports = Format3Builder;
