/**
 * @typedef {import('./method-def')} MethodDef
 * @typedef {import('./node')} Node
 */

const sprintf = require('sprintf-js').sprintf;
const MethodDefFilter = require('./method-def-filter');
const MethodDefJoin = require('./method-def-join');
const MethodDefLower = require('./method-def-lower');
const MethodDefReplace = require('./method-def-replace');
const MethodDefSort = require('./method-def-sort');
const MethodDefSplit = require('./method-def-split');
const MethodDefTrim = require('./method-def-trim');
const MethodDefUpper = require('./method-def-upper');
const NodeRoot = require('./node-root');
const NodeForLoop = require('./node-for-loop');
const NodeLog = require('./node-log');
const Value = require('./value');
const Variable = require('./variable');
const VariableMethod = require('./variable-method');
const VariableProperty = require('./variable-property');

class Builder {
  constructor() {
    /**
     * @type {MethodDef[]}
     * @private
     */
    this._methods = [];
    this._methods.push(new MethodDefFilter());
    this._methods.push(new MethodDefLower());
    this._methods.push(new MethodDefReplace());
    this._methods.push(new MethodDefJoin());
    this._methods.push(new MethodDefSort());
    this._methods.push(new MethodDefSplit());
    this._methods.push(new MethodDefTrim());
    this._methods.push(new MethodDefUpper());
  }

  /**
   * @param {Object} astNode
   */
  build(astNode) {
    const root = new NodeRoot();

    astNode.children.forEach((child) => {
      this._build(root, child);
    });

    return root;
  }

  /**
   * @param {Node} node
   * @param {Object} astNode
   * @private
   */
  _build(node, astNode) {
    if (astNode.type === 'builtin' && astNode.text === 'log') {
      this._buildLog(node, astNode);
    } else if (astNode.type === 'builtin' && astNode.text === 'loop') {
      this._buildLoop(node, astNode);
    } else {
      throw new Error('unknown type: ' + astNode.type);
    }
  }

  /**
   * @param {Node} node
   * @param {Object} astNode
   * @private
   */
  _buildLog(node, astNode) {
    const arg = this._variable(astNode.attributes.arguments[0]);

    node.addChild(new NodeLog(arg));
  }

  /**
   * @param {Node} node
   * @param {Object} astNode
   * @private
   */
  _buildLoop(node, astNode) {
    const array = this._variable(astNode.attributes.array);
    const variable = this._variable(astNode.attributes.variable);
    const forLoop = new NodeForLoop(array, variable);

    astNode.children.forEach((child) => {
      this._build(forLoop, child);
    });

    node.addChild(forLoop);
  }

  /**
   * @param astNode
   * @returns {Variable}
   * @private
   */
  _variable(astNode) {
    const variable = new Variable(astNode.text);

    let chain = astNode;

    while (chain.children.length > 0) {
      const child = chain.children[0];

      if (child.type === 'property') {
        variable.addChainItem(this._variableProperty(child));
      } else {
        variable.addChainItem(this._variableMethod(child));
      }

      chain = child;
    }

    return variable;
  }

  /**
   * @param {Object} astNode
   * @return {VariableProperty}
   * @private
   */
  _variableProperty(astNode) {
    return new VariableProperty(astNode.text);
  }

  /**
   * @param {Object} astNode
   * @return {VariableMethod}
   * @private
   */
  _variableMethod(astNode) {
    const item = new VariableMethod(this._method(astNode));

    astNode.attributes.arguments.forEach((astArg) => {
      if (astArg.type === 'variable') {
        item.addArg(this._variable(astArg));
      } else {
        item.addArg(this._methodArg(astArg));
      }
    });

    return item;
  }

  /**
   * @param {Object} astNode
   * @return {MethodDef}
   * @throws {Error}
   * @private
   */
  _method(astNode) {
    for (let i = 0; i < this._methods.length; i++) {
      if (this._methods[i].getName() === astNode.text) {
        return this._methods[i];
      }
    }

    throw new Error(sprintf('method not found: %s', astNode.text));
  }

  /**
   * @param {Object} astNode
   * @return {Value}
   * @throws {Error}
   * @private
   */
  _methodArg(astNode) {
    if (astNode.type === 'bool') {
      return new Value(astNode.text === 'true');
    } else if (astNode.type === 'int') {
      return new Value(parseInt(astNode.text, 10));
    } else if (astNode.type === 'string') {
      return new Value(astNode.text);
    }

    throw new Error(sprintf('unknown argument type: %s', astNode.type));
  }
}

module.exports = Builder;
