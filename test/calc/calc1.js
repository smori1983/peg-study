const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/calc/calc1');
const infixNotation = require('../../src/calc/helper/infix-notation');

describe('calc1', () => {
  describe('infix notation', () => {
    const fixture = require('./fixture/calc1-infix-notation');

    fixture.forEach(([input, output]) => {
      it(`${input} = ${output}`, () => {
        const ast = parser.parse(input);
        const result = infixNotation.get(ast);

        assert.deepStrictEqual(result, output);
      });
    });
  });
});
