const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/calc/calc1');
const infixNotation = require('../../src/calc/helper/infix-notation');

const fixture = require('./fixture/infix-notation');

describe('calc - infix notation', () => {
  fixture.forEach(([input, output]) => {
    it(`${input} = ${output}`, () => {
      const ast = parser.parse(input);
      const result = infixNotation.get(ast);

      assert.deepStrictEqual(result, output);
    });
  });
});
