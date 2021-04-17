const parserStep1 = require('./calc-parser-step1');
const parserStep2 = require('./calc-parser-step2');

/**
 * @typedef CalcToken
 * @property {string} type
 * @property {string|number} value
 */

class Calc {
  /**
   * @param {string} expression
   * @param {Object} [params]
   * @return {number}
   */
  calc(expression, params) {
    params = params || {};

    /** @var {CalcToken[]} tokens */
    const tokens = parserStep1.parse(expression);

    const expressionStep2 = tokens.map((token) => {
      if (token.type === 'plain') {
        return token.value;
      } else {
        if (params[token.value]) {
          return params[token.value];
        }
        throw new Error('param for placeholder not passed.');
      }
    }).join('');

    return parserStep2.parse(expressionStep2);
  }
}

module.exports = Calc;
