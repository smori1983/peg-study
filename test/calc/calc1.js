const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/calc/calc1');
const infixNotation = require('../../src/calc/helper/infix-notation');
const lispNotation = require('../../src/calc/helper/lisp-notation');
const buAdd0 = require('../../src/calc/visitor/bu-add-0');
const buMulti0 = require('../../src/calc/visitor/bu-multi-0');
const buMulti1 = require('../../src/calc/visitor/bu-multi-1');
const tdFactorize = require('../../src/calc/visitor/td-factorize');

describe('calc1', () => {
  describe('infix notation', () => {
    const dataSet = require('./fixture/calc1-infix-notation');

    dataSet.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast = parser.parse(input);
        const result = infixNotation.get(ast);

        assert.deepStrictEqual(result, output);
      });
    });
  });

  describe('lisp notation', () => {
    const dataSet = require('./fixture/calc1-lisp-notation');

    dataSet.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast = parser.parse(input);
        const result = lispNotation.get(ast);

        assert.deepStrictEqual(result, output);
      });
    });
  });

  describe('visitor', () => {
    describe('bu-add-0', () => {
      const dataSet = require('./fixture/calc1-visitor').buAdd0;

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

    describe('bu-multi-0', () => {
      const dataSet = require('./fixture/calc1-visitor').buMulti0;

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

    describe('bu-multi-1', () => {
      const dataSet = require('./fixture/calc1-visitor').buMulti1;

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

    describe('combination', () => {
      const dataSet = require('./fixture/calc1-visitor').combination;

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

    describe('td-factorize', () => {
      const dataSet = require('./fixture/calc1-visitor').tdFactorize;

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
  });
});
