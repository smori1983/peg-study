const sprintf = require('sprintf-js').sprintf;
const RuntimeError = require('../error/runtime-error');
const MethodDefLower = require('../method/method-def-lower');
const MethodDefUpper = require('../method/method-def-upper');
const MethodDefSplit = require('../method/method-def-split');
const MethodDefJoin = require('../method/method-def-join');

class Format2Manager {
  constructor() {
    /**
     * @private
     * @type {MethodDef[]}
     */
    this._methods = [];
    this._methods.push(new MethodDefLower());
    this._methods.push(new MethodDefUpper());
    this._methods.push(new MethodDefSplit());
    this._methods.push(new MethodDefJoin());
  }

  /**
   * @param {Object} variables
   * @param {Object} ast
   * @throws {Error}
   */
  invoke(variables, ast) {
    this._checkVariable(variables, ast);

    let currentReceiver = variables[ast.variable.text];
    let receiverType = this._getDataType(currentReceiver);

    ast.methods.forEach((method) => {
      const currentMethod = this._findMethodDef(method);

      this._checkReceiverType(receiverType, currentMethod, method.method.location);
      this._checkArgumentTypes(method, currentMethod);

      const args = method.args.map((arg) => {
        if (arg.type === 'bool') {
          return arg.text === 'true';
        } else if (arg.type === 'int') {
          return parseInt(arg.text, 10);
        } else if (arg.type === 'string') {
          return arg.text;
        } else {
          throw new Error(sprintf('unknown argument type: %s', arg.type));
        }
      });

      const returnValue = currentMethod.evaluate(currentReceiver, args);
      const returnValueType = this._getDataType(returnValue);

      if (returnValueType !== currentMethod.getReturnType()) {
        throw new RuntimeError(sprintf('return value of %s should be %s, actual was %s', currentMethod.getName(), currentMethod.getReturnType(), returnValueType), method.method.location);
      }

      currentReceiver = returnValue;
      receiverType = this._getDataType(currentReceiver);
    });

    return currentReceiver;
  }

  /**
   * @param {Object} variables
   * @param {Object} ast
   * @throws {Error}
   * @private
   */
  _checkVariable(variables, ast) {
    if (!variables.hasOwnProperty(ast.variable.text)) {
      throw new RuntimeError(sprintf('variable not registered: %s', ast.variable.text), ast.variable.location);
    }
  }

  /**
   * @param {string} receiverType
   * @param {MethodDef} methodDef
   * @param {RuntimeErrorLocation} location
   * @throws {Error}
   * @private
   */
  _checkReceiverType(receiverType, methodDef, location) {
    if (receiverType !== methodDef.getReceiverType()) {
      throw new RuntimeError(sprintf('%s cannot use method %s', receiverType, methodDef.getName()), location);
    }
  }

  /**
   * @param {Object} method
   * @param {MethodDef} methodDef
   * @throws {Error}
   * @private
   */
  _checkArgumentTypes(method, methodDef) {
    if (method.args.length !== methodDef.getArgTypes().length) {
      throw new RuntimeError(sprintf('number of arguments of method %s should be %d', methodDef.getName(), methodDef.getArgTypes().length), method.method.location);
    }

    for (let i = 0; i < method.args.length; i++) {
      if (method.args[i].type !== methodDef.getArgTypes()[i]) {
        throw new RuntimeError(sprintf('argument type does not match for method %s', methodDef.getName()), method.args[i].location);
      }
    }
  }

  /**
   * @param {Object} method
   * @return {MethodDef}
   * @throws {Error}
   * @private
   */
  _findMethodDef(method) {
    for (let i = 0; i < this._methods.length; i++) {
      if (this._methods[i].getName() === method.method.text) {
        return this._methods[i];
      }
    }

    throw new RuntimeError(sprintf('method not found: %s', method.method.text), method.method.location);
  }

  /**
   * @param {*} value
   * @return {string}
   * @private
   */
  _getDataType(value) {
    if (value === null) {
      return 'null';
    } else if (Array.isArray(value)) {
      return 'array';
    } else {
      return typeof value;
    }
  }
}

module.exports = Format2Manager;
