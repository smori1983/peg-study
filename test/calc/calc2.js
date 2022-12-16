const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/calc/calc2');
const lispNotation = require('../../src/calc/helper/lisp-notation');

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
});
