const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/condition/format2');
const Scope = require('../../src/condition/evaluation/scope');
const evaluator = require('../../src/condition/evaluation/evaluator');

describe('condition - evaluation - block', () => {
  const dataSet = [
    ['if (true) { log("a") }', {}, ['a']],
    [`
      if (item.value > 100) {
        log('1')
      } else {
        log('2')
      }
    `, {item: {value: 100}}, ['2']],
    [`
      if (a >= 10 && b >= 20) {
        if (c < 30) {
          log('1')
        } elseif (c == 30) {
          log('2')
        } else {
          log('3')
        }
      } else {
        log('4')
      }
    `, {a: 10, b: 20, c: 30}, ['2']],
  ];

  dataSet.forEach(([code, variables, output], index) => {
    it('evaluate block: case ' + (index + 1), () => {
      const scope = new Scope(variables);
      const ast = parser.parse(code);
      const result = evaluator.run(ast, scope);

      assert.deepStrictEqual(result, output);
    });
  });
});
