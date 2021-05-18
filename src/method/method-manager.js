const MethodDefLower = require('./method-def-lower');
const MethodDefUpper = require('./method-def-upper');

class MethodManager {
  constructor() {
    /**
     * @type {MethodDef[]}
     */
    this._methods = [];
    this._methods.push(new MethodDefLower());
    this._methods.push(new MethodDefUpper());
  }

  /**
   * @param {Object} variables
   * @param {Object} ast
   * @throws {Error}
   */
  invoke(variables, ast) {
    if (!variables.hasOwnProperty(ast.name)) {
      throw new Error('variable not registered: ' + ast.name);
    }

    let currentReceiver = variables[ast.name];
    let currentMethod;

    ast.methods.forEach((method) => {
      currentMethod = this._findMethodDef(method.name);

      if (typeof currentReceiver !== currentMethod.getReceiverType()) {
        throw new Error((typeof currentReceiver) + ' cannot use method ' + currentMethod.getName());
      }

      if (method.args.length !== currentMethod.getArgTypes().length) {
        throw new Error('number of arguments of method ' + currentMethod.getName() + ' should be ' + currentMethod.getArgTypes().length);
      }

      for (let i = 0; i < method.args.length; i++) {
        if (method.args[i].type !== currentMethod.getArgTypes()[i]) {
          throw new Error('argument type does not match for method ' + currentMethod.getName());
        }
      }

      const args = method.args.map((arg) => {
        if (arg.type === 'bool') {
          return arg.text === 'true';
        } else if (arg.type === 'int') {
          return parseInt(arg.text, 10);
        } else if (arg.type === 'string') {
          return arg.text;
        } else {
          throw new Error('unknown argument type: ' + arg.type);
        }
      });

      currentReceiver = currentMethod.evaluate(currentReceiver, args);
    });

    return currentReceiver;
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

    throw new Error('method not found: ' + name);
  }
}

module.exports = MethodManager;