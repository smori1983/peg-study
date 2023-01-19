const {describe, it} = require('mocha');
const assert = require('assert');

const infixNotation = require('../../../src/calc/helper/infix-notation');
const lispNotation = require('../../../src/calc/helper/lisp-notation');
const buAdd0 = require('../../../src/calc/visitor/bu-add-0');
const buMulti0 = require('../../../src/calc/visitor/bu-multi-0');
const buMulti1 = require('../../../src/calc/visitor/bu-multi-1');
const tdFactorize = require('../../../src/calc/visitor/td-factorize');

/**
 * @param {PEG.Parser} parser
 * @param {string[][]} dataSet
 */
module.exports.infixNotation = (parser, dataSet) => {
  describe('infix notation', () => {
    dataSet.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast = parser.parse(input);
        const result = infixNotation.get(ast);

        assert.deepStrictEqual(result, output);
      });
    });
  });
};

/**
 * @param {PEG.Parser} parser
 * @param {string[][]} dataSet
 */
module.exports.lispNotation = (parser, dataSet) => {
  describe('lisp notation', () => {
    dataSet.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast = parser.parse(input);
        const result = lispNotation.get(ast);

        assert.deepStrictEqual(result, output);
      });
    });
  });
};

/**
 * @param {PEG.Parser} parser
 * @param {string[][]} dataSet
 */
module.exports.buAdd0 = (parser, dataSet) => {
  describe('bu-add-0', () => {
    dataSet.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast1 = parser.parse(input);
        buAdd0.visit(ast1);
        const result1 = infixNotation.get(ast1);

        const ast2 = parser.parse(output);
        const result2 = infixNotation.get(ast2);

        assert.deepStrictEqual(result1, result2);
      });
    });
  });
};

/**
 * @param {PEG.Parser} parser
 * @param {string[][]} dataSet
 */
module.exports.buMulti0 = (parser, dataSet) => {
  describe('bu-multi-0', () => {
    dataSet.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast1 = parser.parse(input);
        buMulti0.visit(ast1);
        const result1 = infixNotation.get(ast1);

        const ast2 = parser.parse(output);
        const result2 = infixNotation.get(ast2);

        assert.deepStrictEqual(result1, result2);
      });
    });
  });
};

/**
 * @param {PEG.Parser} parser
 * @param {string[][]} dataSet
 */
module.exports.buMulti1 = (parser, dataSet) => {
  describe('bu-multi-1', () => {
    dataSet.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast1 = parser.parse(input);
        buMulti1.visit(ast1);
        const result1 = infixNotation.get(ast1);

        const ast2 = parser.parse(output);
        const result2 = infixNotation.get(ast2);

        assert.deepStrictEqual(result1, result2);
      });
    });
  });
};

/**
 * @param {PEG.Parser} parser
 * @param {string[][]} dataSet
 */
module.exports.buCombination = (parser, dataSet) => {
  describe('combination', () => {
    dataSet.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast1 = parser.parse(input);

        buAdd0.visit(ast1);
        buMulti0.visit(ast1);
        buMulti1.visit(ast1);

        buAdd0.visit(ast1);
        buMulti0.visit(ast1);
        buMulti1.visit(ast1);

        const result1 = infixNotation.get(ast1);

        const ast2 = parser.parse(output);
        const result2 = infixNotation.get(ast2);

        assert.deepStrictEqual(result1, result2);
      });
    });
  });
};

/**
 * @param {PEG.Parser} parser
 * @param {string[][]} dataSet
 */
module.exports.tdFactorize = (parser, dataSet) => {
  describe('td-factorize', () => {
    dataSet.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast1 = parser.parse(input);

        tdFactorize.visit(ast1);

        const result1 = infixNotation.get(ast1);

        const ast2 = parser.parse(output);
        const result2 = infixNotation.get(ast2);

        assert.deepStrictEqual(result1, result2);
      });
    });
  });
};
