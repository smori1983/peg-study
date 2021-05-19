const sprintf = require('sprintf-js').sprintf;
const MethodDefLower = require('./method-def-lower');
const MethodDefUpper = require('./method-def-upper');
const MethodDefSplit = require('./method-def-split');
const MethodDefJoin = require('./method-def-join');

class MethodManager {
  constructor() {
    /**
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
  validate(variables, ast) {
    this._checkVariable(variables, ast);

    let receiverType = this._getDataType(variables[ast.name])

    ast.methods.forEach((method) => {
      const currentMethod = this._findMethodDef(method.name);

      this._checkReceiverType(receiverType, currentMethod);
      this._checkArgumentTypes(method.args, currentMethod);

      receiverType = currentMethod.getReturnType();
    });
  }

  /**
   * @param {Object} variables
   * @param {Object} ast
   * @throws {Error}
   */
  invoke(variables, ast) {
    this._checkVariable(variables, ast);

    let currentReceiver = variables[ast.name];
    let receiverType = this._getDataType(currentReceiver);

    ast.methods.forEach((method) => {
      const currentMethod = this._findMethodDef(method.name);

      this._checkReceiverType(receiverType, currentMethod);
      this._checkArgumentTypes(method.args, currentMethod);

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
        throw new Error(sprintf('return value of %s should be %s, actual was %s', currentMethod.getName(), currentMethod.getReturnType(), returnValueType));
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
    if (!variables.hasOwnProperty(ast.name)) {
      throw new Error(sprintf('variable not registered: %s', ast.name));
    }
  }

  /**
   * @param {string} receiverType
   * @param {MethodDef} methodDef
   * @throws {Error}
   * @private
   */
  _checkReceiverType(receiverType, methodDef) {
    if (receiverType !== methodDef.getReceiverType()) {
      throw new Error(sprintf('%s cannot use method %s', receiverType, methodDef.getName()));
    }
  }

  /**
   * @param {Object} args
   * @param {MethodDef} methodDef
   * @throws {Error}
   * @private
   */
  _checkArgumentTypes(args, methodDef) {
    if (args.length !== methodDef.getArgTypes().length) {
      throw new Error(sprintf('number of arguments of method %s should be %d', methodDef.getName(), methodDef.getArgTypes().length));
    }

    for (let i = 0; i < args.length; i++) {
      if (args[i].type !== methodDef.getArgTypes()[i]) {
        throw new Error(sprintf('argument type does not match for method %s', methodDef.getName()));
      }
    }
  }

  /**
   * @param {string} name
   * @return {MethodDef}
   * @throws {Error}
   * @private
   */
  _findMethodDef(name) {
    for (let i = 0; i < this._methods.length; i++) {
      if (this._methods[i].getName() === name) {
        return this._methods[i];
      }
    }

    throw new Error(sprintf('method not found: %s', name));
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

module.exports = MethodManager;
