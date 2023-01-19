const {describe} = require('mocha');
const helper = require('./_helper/grammar');

const parser = require('../../src/calc/calc2');

describe('calc2', () => {
  const dataInfixNotation = require('./_data/calc2-infix-notation');
  helper.infixNotation(parser, dataInfixNotation);

  const dataLispNotation = require('./_data/calc2-lisp-notation');
  helper.lispNotation(parser, dataLispNotation);

  describe('visitor', () => {
    const data = require('./_data/calc2-visitor');

    helper.buAdd0(parser, data.buAdd0);
    helper.buMulti0(parser, data.buMulti0);
    helper.buMulti1(parser, data.buMulti1);
    helper.buCombination(parser, data.combination);
    helper.tdFactorize(parser, data.tdFactorize);
  });
});
