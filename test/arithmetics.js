const {describe, it} = require('mocha');
const assert = require('assert');
const parser = require('../src/arithmetics');

describe('arithmetics', () => {
  it('1+1 = 2', () => {
    assert.deepStrictEqual(parser.parse('1+1'), 2);
  });

  it('1+2*3 = 7', () => {
    assert.deepStrictEqual(parser.parse('1+2*3'), 7);
  });

  it('1-2 => error', () => {
    assert.throws(() => {
      parser.parse('1-2');
    });
  });

  it('1/2 => error', () => {
    assert.throws(() => {
      parser.parse('1/2');
    });
  });
});
