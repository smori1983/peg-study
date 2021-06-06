const sprintf = require('sprintf-js').sprintf;
const Method = require('./method');
const Scope = require('./scope');
const Value = require('./value');
const Variable = require('./variable');

class VariableMethod {
  /**
   * @param {Method} method
   */
  constructor(method) {
    this._method = method;

    /**
     * @type {(Value|Variable)[]}
     * @private
     */
    this._args = [];
  }

  /**
   * @param {(Value|Variable)} arg
   */
  addArg(arg) {
    this._args.push(arg);
  }

  /**
   * @param {Scope} scope
   * @param {Value} receiver
   * @return {Value}
   */
  evaluate(scope, receiver) {
    this._checkReceiverType(receiver);

    const args = [];
    this._args.forEach((arg) => {
      if (arg instanceof Variable) {
        args.push(arg.resolve(scope));
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
   * @param {Value} receiver
   * @throws {Error}
   * @private
   */
  _checkReceiverType(receiver) {
    if (receiver.getType() !== this._method.getReceiverType()) {
      throw new Error(sprintf('%s cannot use method %s', receiver.getType(), this._method.getName()));
    }
  }

  /**
   * @param {Value[]} args
   * @throws {Error}
   * @private
   */
  _checkArguments(args) {
    if (args.length !== this._method.getArgTypes().length) {
      throw new Error(sprintf('number of arguments of method %s should be %d', this._method.getName(), this._method.getArgTypes().length));
    }

    for (let i = 0; i < args.length; i++) {
      if (args[i].getType() !== this._method.getArgTypes()[i]) {
        throw new Error(sprintf('argument type does not match for method %s', this._method.getName()));
      }
    }
  }

  /**
   * @param {Value} returnValue
   * @throws {Error}
   * @private
   */
  _checkReturnValueType(returnValue) {
    if (returnValue.getType() !== this._method.getReturnType()) {
      throw new Error(sprintf('return value of %s should be %s, actual was %s', this._method.getName(), this._method.getReturnType(), returnValue.getType()));
    }
  }
}

module.exports = VariableMethod;
