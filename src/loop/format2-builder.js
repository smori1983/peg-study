const sprintf = require('sprintf-js').sprintf;
const BuiltinFor = require('./builtin-for');
const BuiltinLog = require('./builtin-log');
const MethodJoin = require('./method-join');
const MethodLower = require('./method-lower');
const MethodSplit = require('./method-split');
const MethodUpper = require('./method-upper');
const MethodQueueItem = require('./method-queue-item');
const Node = require('./node');
const Root = require('./root');
const Value = require('./value');
const Variable = require('./variable');

class Format2Builder {
  constructor() {
    /**
     * @type {Method[]}
     * @private
     */
    this._methods = [];
    this._methods.push(new MethodLower());
    this._methods.push(new MethodJoin());
    this._methods.push(new MethodSplit());
    this._methods.push(new MethodUpper());
  }

  /**
   * @param {Object} astRoot
   */
  build(astRoot) {
    const root = new Root();

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
    const forLoop = new BuiltinFor(array, variable);

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
    node.addChild(new BuiltinLog(arg));
  }

  /**
   * @param ast
   * @returns {Variable}
   * @private
   */
  _buildVariable(ast) {
    const variable = new Variable(ast.text);

    (ast.methods || []).forEach((astMethod) => {
      const item = new MethodQueueItem(this._buildMethod(astMethod));

      astMethod.args.forEach((astMethodArg) => {
        if (astMethodArg.type === 'variable') {
          item.addArg(this._buildVariable(astMethodArg));
        } else {
          item.addArg(this._buildMethodArg(astMethodArg));
        }
      });

      variable.addMethod(item);
    });

    return variable;
  }

  /**
   * @param {Object} ast
   * @return {Method}
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
