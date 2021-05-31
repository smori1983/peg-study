const sprintf = require('sprintf-js').sprintf;
const MethodArgBool = require('./method-arg-bool');
const MethodArgInt = require('./method-arg-int');
const MethodArgString = require('./method-arg-string');
const MethodJoin = require('./method-join');
const MethodLower = require('./method-lower');
const MethodSplit = require('./method-split');
const MethodUpper = require('./method-upper');
const Scope = require('./scope');
const VariableMethod = require('./variable-method');

class MethodInvoker {
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
   * @param {Scope} scope
   * @param {Variable} variable
   * @return {*}
   */
  invoke(scope, variable) {
    let currentReceiver = scope.resolveVariable(variable.getName());

    variable.getMethods().forEach((method) => {
      const currentMethod = this._findMethodDef(method.getText());

      this._checkReceiverType(currentReceiver, currentMethod);

      const args = this._prepareArgs(method);

      this._checkArgumentTypes(args, currentMethod);

      const returnValue = currentMethod.evaluate(currentReceiver, args);

      this._checkReturnValueType(returnValue, currentMethod);

      currentReceiver = returnValue;
    });

    return currentReceiver;
  }

  /**
   * @param {*} receiver
   * @param {Method} method
   * @throws {Error}
   * @private
   */
  _checkReceiverType(receiver, method) {
    const receiverType = this._getDataType(receiver);

    if (receiverType !== method.getReceiverType()) {
      throw new Error(sprintf('%s cannot use method %s', receiverType, method.getName()));
    }
  }

  /**
   * @param {VariableMethod} method
   * @return {MethodArg[]}
   * @private
   */
  _prepareArgs(method) {
    return method.getArgs().map((arg) => {
      if (arg.getType() === 'bool') {
        return new MethodArgBool(arg.getText());
      } else if (arg.getType() === 'int') {
        return new MethodArgInt(arg.getText());
      } else if (arg.getType() === 'string') {
        return new MethodArgString(arg.getText());
      } else {
        throw new Error(sprintf('unknown argument type: %s', arg.getType()));
      }
    });
  }

  /**
   * @param {MethodArg[]} args
   * @param {Method} method
   * @throws {Error}
   * @private
   */
  _checkArgumentTypes(args, method) {
    if (args.length !== method.getArgTypes().length) {
      throw new Error(sprintf('number of arguments of method %s should be %d', method.getName(), method.getArgTypes().length));
    }

    for (let i = 0; i < args.length; i++) {
      if (args[i].getType() !== method.getArgTypes()[i]) {
        throw new Error(sprintf('argument type does not match for method %s', method.getName()));
      }
    }
  }

  /**
   * @param {*} returnValue
   * @param {Method} method
   * @throws {Error}
   * @private
   */
  _checkReturnValueType(returnValue, method) {
    const returnValueType = this._getDataType(returnValue);

    if (returnValueType !== method.getReturnType()) {
      throw new Error(sprintf('return value of %s should be %s, actual was %s', method.getName(), method.getReturnType(), returnValueType));
    }
  }

  /**
   * @param {string} name
   * @return {Method}
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

module.exports = MethodInvoker;