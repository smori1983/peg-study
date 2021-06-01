const BuiltinFor = require('./builtin-for');
const BuiltinLog = require('./builtin-log');
const Root = require('./root');
const SymbolParent = require('./symbol-parent');
const Variable = require('./variable');
const VariableMethod = require('./variable-method');
const VariableMethodArg = require('./variable-method-arg');

class Format2Builder {
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
   * @param {SymbolParent} symbol
   * @param {Object} ast
   * @private
   */
  _build(symbol, ast) {
    if (ast.type === 'builtin' && ast.text === 'for') {
      this._buildFor(symbol, ast);
    } else if (ast.type === 'builtin' && ast.text === 'log') {
      this._buildLog(symbol, ast);
    } else {
      throw new Error('unknown type: ' + ast.type);
    }
  }

  /**
   * @param {SymbolParent} symbol
   * @param {Object} ast
   * @private
   */
  _buildFor(symbol, ast) {
    const array = this._buildVariable(ast.array);
    const variable = this._buildVariable(ast.variable);
    const forLoop = new BuiltinFor(array, variable);

    ast.children.forEach((child) => {
      this._build(forLoop, child);
    });

    symbol.addChild(forLoop);
  }

  /**
   * @param {SymbolParent} symbol
   * @param {Object} ast
   * @private
   */
  _buildLog(symbol, ast) {
    const arg = this._buildVariable(ast.args[0]);
    symbol.addChild(new BuiltinLog(arg));
  }

  /**
   * @param ast
   * @returns {Variable}
   * @private
   */
  _buildVariable(ast) {
    const methods = (ast.methods || []).map((astMethod) => {
      const methodArgs = astMethod.args.map((astMethodArg) => {
        if (astMethodArg.type === 'variable') {
          return this._buildVariable(astMethodArg);
        } else {
          return new VariableMethodArg(astMethodArg.type, astMethodArg.text);
        }
      }, []);

      return new VariableMethod(astMethod.text, methodArgs);
    }, []);

    return new Variable(ast.text, methods);
  }
}

module.exports = Format2Builder;
