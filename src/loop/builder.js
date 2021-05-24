const LanguageConstructDefFor = require('./language-construct-def-for');
const LanguageConstructDefLog = require('./language-construct-def-log');
const Root = require('./root');
const SymbolParent = require('./symbol-parent');
const Variable = require('./variable');

class Builder {
  /**
   * @param {Object[]} ast
   */
  build(ast) {
    const root = new Root();

    ast.forEach((child) => {
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
    if (ast.type === 'language_construct' && ast.text === 'for') {
      this._buildFor(symbol, ast);
    } else if (ast.type === 'language_construct' && ast.text === 'log') {
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
    const forLoop = new LanguageConstructDefFor(array, variable);

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
    const arg = this._buildVariable(ast.variable);
    symbol.addChild(new LanguageConstructDefLog(arg));
  }

  /**
   * @param ast
   * @returns {Variable}
   * @private
   */
  _buildVariable(ast) {
    return new Variable(ast.text);
  }
}

module.exports = Builder;
