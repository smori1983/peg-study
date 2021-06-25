const sprintf = require('sprintf-js').sprintf;
const MethodDef = require('../loop/method-def');
const MethodDefJoin = require('../loop/method-def-join');
const MethodDefLower = require('../loop/method-def-lower');
const MethodDefSplit = require('../loop/method-def-split');
const MethodDefUpper = require('../loop/method-def-upper');
const Node = require('../loop/node');
const NodeRoot = require('../loop/node-root');
const NodeForLoop = require('../loop/node-for-loop');
const NodeLog = require('../loop/node-log');
const Value = require('../loop/value');
const Variable = require('../loop/variable');
const VariableMethod = require('../loop/variable-method');
const VariableProperty = require('../loop/variable-property');

class Format2Builder {
  constructor() {
    /**
     * @type {MethodDef[]}
     * @private
     */
    this._methods = [];
    this._methods.push(new MethodDefLower());
    this._methods.push(new MethodDefJoin());
    this._methods.push(new MethodDefSplit());
    this._methods.push(new MethodDefUpper());
  }

  /**
   * @param {Object} astRoot
   */
  build(astRoot) {
    const root = new NodeRoot();

    astRoot.children.forEach((child) => {
      this._build(root, child);
    });

    return root;
  }

  /**
   * @param {Node} node
   * @param {Object} ast
   * @private
   */
  _build(node, ast) {
    if (ast.type === 'builtin' && ast.text === 'for') {
      this._buildFor(node, ast);
    } else if (ast.type === 'builtin' && ast.text === 'log') {
      this._buildLog(node, ast);
    } else {
      throw new Error('unknown type: ' + ast.type);
    }
  }

  /**
   * @param {Node} node
   * @param {Object} ast
   * @private
   */
  _buildFor(node, ast) {
    const array = this._buildVariable(ast.array);
    const variable = this._buildVariable(ast.variable);
    const forLoop = new NodeForLoop(array, variable);

    ast.children.forEach((child) => {
      this._build(forLoop, child);
    });

    node.addChild(forLoop);
  }

  /**
   * @param {Node} node
   * @param {Object} ast
   * @private
   */
  _buildLog(node, ast) {
    const arg = this._buildVariable(ast.args[0]);

    node.addChild(new NodeLog(arg));
  }

  /**
   * @param ast
   * @returns {Variable}
   * @private
   */
  _buildVariable(ast) {
    const variable = new Variable(ast.text);

    (ast.methods || []).forEach((astMethod) => {
      if (astMethod.type === 'property') {
        variable.addChainItem(new VariableProperty(astMethod.text));
      } else {
        const item = new VariableMethod(this._buildMethod(astMethod));

        astMethod.args.forEach((astMethodArg) => {
          if (astMethodArg.type === 'variable') {
            item.addArg(this._buildVariable(astMethodArg));
          } else {
            item.addArg(this._buildMethodArg(astMethodArg));
          }
        });

        variable.addChainItem(item);
      }
    });

    return variable;
  }

  /**
   * @param {Object} ast
   * @return {MethodDef}
   * @throws {Error}
   * @private
   */
  _buildMethod(ast) {
    for (let i = 0; i < this._methods.length; i++) {
      if (this._methods[i].getName() === ast.text) {
        return this._methods[i];
      }
    }

    throw new Error(sprintf('method not found: %s', ast.text));
  }

  /**
   * @param {Object} ast
   * @return {Value}
   * @throws {Error}
   * @private
   */
  _buildMethodArg(ast) {
    if (ast.type === 'bool') {
      return new Value(ast.text === 'true');
    } else if (ast.type === 'int') {
      return new Value(parseInt(ast.text, 10));
    } else if (ast.type === 'string') {
      return new Value(ast.text);
    }

    throw new Error(sprintf('unknown argument type: %s', ast.type));
  }
}

module.exports = Format2Builder;