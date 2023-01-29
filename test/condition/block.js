const {describe, it} = require('mocha');
const assert = require('assert');

const parser = require('../../src/condition/format3');
const Scope = require('../../src/condition/evaluation/scope');
const evaluator = require('../../src/condition/evaluation/evaluator');

describe('condition - evaluation - block', () => {
  const dataSet = require('./_data/block');

  dataSet.forEach((data, index) => {
    it('evaluate block: case ' + (index + 1), () => {
      const scope = new Scope(data.variables);
      const ast = parser.parse(data.input);
      const result = ast.reduce((previous, node) => {
        return previous.concat(evaluator.run(node, scope));
      }, []);

      assert.deepStrictEqual(result, data.output);
    });
  });
});
