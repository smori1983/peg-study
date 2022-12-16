const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/calc/calc2');
const lispNotation = require('../../src/calc/helper/lisp-notation');
const buAdd0 = require('../../src/calc/visitor/bu-add-0');
const infixNotation = require('../../src/calc/helper/infix-notation');

describe('calc2', () => {
  describe('lisp notation', () => {
    const dataSet = require('./fixture/calc2-lisp-notation');

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
      const dataSet = require('./fixture/calc2-visitor').buAdd0;

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
  });
});
