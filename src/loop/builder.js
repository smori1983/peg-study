const LanguageConstructDefFor = require('./language-construct-def-for');
const LanguageConstructDefLog = require('./language-construct-def-log');
const Root = require('./root');
const SymbolParent = require('./symbol-parent');

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
    const forLoop = new LanguageConstructDefFor(ast.array.text, ast.variable.text);

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
    symbol.addChild(new LanguageConstructDefLog(ast.variable.text));
  }
}

module.exports = Builder;
