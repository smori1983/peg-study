const sprintf = require('sprintf-js').sprintf;
const Method = require('./method');
const MethodArg = require('./method-arg');
const Scope = require('./scope');
const Variable = require('./variable');

class MethodQueueItem {
  /**
   * @param {Method} method
   */
  constructor(method) {
    this._method = method;

    /**
     * @type {(MethodArg|Variable)[]}
     * @private
     */
    this._args = [];
  }

  /**
   * @param {(MethodArg|Variable)} arg
   */
  addArg(arg) {
    this._args.push(arg);
  }

  /**
   * @param {Scope} scope
   * @param {*} receiver
   * @return {*}
   */
  evaluate(scope, receiver) {
    this._checkReceiverType(receiver);

    const args = [];
    this._args.forEach((arg) => {
      if (arg instanceof Variable) {
        args.push(new MethodArg(arg.evaluate(scope)));
      } else {
        args.push(arg);
      }
    });

    this._checkArguments(args);

    const result = this._method.evaluate(receiver, args);

    this._checkReturnValueType(result);

    return result;
  }

  /**
   * @param {*} receiver
   * @throws {Error}
   * @private
   */
  _checkReceiverType(receiver) {
    const receiverType = this._getDataType(receiver);

    if (receiverType !== this._method.getReceiverType()) {
      throw new Error(sprintf('%s cannot use method %s', receiverType, this._method.getName()));
    }
  }

  /**
   * @param {MethodArg[]} args
   * @throws {Error}
   * @private
   */
  _checkArguments(args) {
    if (args.length !== this._method.getArgTypes().length) {
      throw new Error(sprintf('number of arguments of method %s should be %d', this._method.getName(), this._method.getArgTypes().length));
    }

    //for (let i = 0; i < args.length; i++) {
    //  if (args[i].getType() !== this._method.getArgTypes()[i]) {
    //    throw new Error(sprintf('argument type does not match for method %s', this._method.getName()));
    //  }
    //}
  }

  /**
   * @param {*} returnValue
   * @throws {Error}
   * @private
   */
  _checkReturnValueType(returnValue) {
    const returnValueType = this._getDataType(returnValue);

    if (returnValueType !== this._method.getReturnType()) {
      throw new Error(sprintf('return value of %s should be %s, actual was %s', this._method.getName(), this._method.getReturnType(), returnValueType));
    }
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

module.exports = MethodQueueItem;
