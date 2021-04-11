const {describe, it} = require('mocha');
const assert = require('assert');
const parser = require('../src/arithmetics');

describe('arithmetics', () => {
  it('"1+1" = 2', () => {
    assert.deepStrictEqual(parser.parse('1+1'), 2);
  });

  it('"1 + 1" = 2', () => {
    assert.deepStrictEqual(parser.parse('1 + 1'), 2);
  });

  it('"1-1" = 0', () => {
    assert.deepStrictEqual(parser.parse('1-1'), 0);
  });

  it('"1 - 1" = 0', () => {
    assert.deepStrictEqual(parser.parse('1 - 1'), 0);
  });

  it('"1-2" = -1', () => {
    assert.deepStrictEqual(parser.parse('1-2'), -1);
  });

  it('"2*5" = 10', () => {
    assert.deepStrictEqual(parser.parse('2*5'), 10);
  });

  it('"2 * 5" = 10', () => {
    assert.deepStrictEqual(parser.parse('2 * 5'), 10);
  });

  it('"1/2" = 0.5', () => {
    assert.deepStrictEqual(parser.parse('1/2'), 0.5);
  });

  it('"2/2" = 1', () => {
    assert.deepStrictEqual(parser.parse('2/2'), 1);
  });

  it('"2 / 2" = 1', () => {
    assert.deepStrictEqual(parser.parse('2 / 2'), 1);
  });

  it('"2*(1+2)" = 6', () => {
    assert.deepStrictEqual(parser.parse('2*(1+2)'), 6);
  });

  it('"2 * ( 1 + 2 )" = 6', () => {
    assert.deepStrictEqual(parser.parse('2 * ( 1 + 2 )'), 6);
  });
});
