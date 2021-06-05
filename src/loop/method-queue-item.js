const Method = require('./method');
const MethodArg = require('./method-arg');
const Scope = require('./scope');
const Variable2 = require('./variable2');

class MethodQueueItem {
  /**
   * @param {Method} method
   * @param {(MethodArg|Variable2)[]} args
   */
  constructor(method, args) {
    this._method = method;
    this._args = args;
  }

  /**
   * @param {Scope} scope
   * @param {*} receiver
   * @return {*}
   */
  evaluate(scope, receiver) {
    const args = [];
    this._args.forEach((arg) => {
      if (arg instanceof Variable2) {
        args.push(new MethodArg(arg.evaluate(scope)));
      } else {
        args.push(arg);
      }
    });
    return this._method.evaluate(receiver, args);
  }
}

module.exports = MethodQueueItem;
