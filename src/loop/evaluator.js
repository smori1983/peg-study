const Scope = require('./scope');

class Evaluator {
  /**
   * @param {Object[]} ast
   * @param {Scope} scope
   */
  evaluate(ast, scope) {
    ast.forEach((child) => {
      this._evaluate(child, scope);
    });
  }

  /**
   * @param {Object} ast
   * @param {Scope} scope
   * @private
   */
  _evaluate(ast, scope) {
    if (ast.type === 'language_construct' && ast.text === 'for') {
      this._evaluateFor(ast, scope);
    } else if (ast.type === 'language_construct' && ast.text === 'log') {
      this._evaluateLog(ast, scope);
    }
  }

  /**
   * @param {Object} ast
   * @param {Scope} parentScope
   * @private
   */
  _evaluateFor(ast, parentScope) {
    const arrayName = ast.array.text;
    const variableName = ast.variable.text;

    const array = parentScope.resolveVariable(arrayName);

    if (!Array.isArray(array)) {
      throw new Error(arrayName + ' is not array');
    }

    for (let i = 0; i < array.length; i++) {
      const scope = new Scope(parentScope);
      scope.addVariable(variableName, array[i]);

      ast.children.forEach((child) => {
        this._evaluate(child, scope);
      });
    }
  }

  /**
   * @param {Object} ast
   * @param {Scope} scope
   * @private
   */
  _evaluateLog(ast, scope) {
    const argName = ast.variable.text;
    console.log(scope.resolveVariable(argName));
  }
}

module.exports = Evaluator;
