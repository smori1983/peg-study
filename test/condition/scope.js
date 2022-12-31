const {describe, it} = require('mocha');
const assert = require('assert');

const Scope = require('../../src/condition/evaluation/scope');

describe('condition - scope', () => {
  describe('without parent', () => {
    describe('without variables', () => {
      const dataSet = [
        [[]],
        [['key1']],
        [['key1', 'key2']],
      ];

      dataSet.forEach(([keys], index) => {
        it('should throw error: case ' + (index + 1), () => {
          const scope = new Scope();

          assert.throws(() => {
            scope.getValue(keys);
          }, Error);
        });
      })
    });

    describe('with variables', () => {
      const dataSet = [
        [{key1: null}, ['key1'], null],
        [{key1: true}, ['key1'], true],
        [{key1: false}, ['key1'], false],
        [{key1: 123}, ['key1'], 123],
        [{key1: 'value1'}, ['key1'], 'value1'],

        [{key1: {key2: null}}, ['key1', 'key2'], null],
        [{key1: {key2: true}}, ['key1', 'key2'], true],
        [{key1: {key2: false}}, ['key1', 'key2'], false],
        [{key1: {key2: 123}}, ['key1', 'key2'], 123],
        [{key1: {key2: 'value2'}}, ['key1', 'key2'], 'value2'],
      ];

      dataSet.forEach(([variables, keys, value], index) => {
        it('should get value: case ' + (index + 1), () => {
          const scope = new Scope(variables);

          assert.deepStrictEqual(scope.getValue(keys), value);
        });
      });
    });
  });

  describe('with parent', () => {
    describe('without variables', () => {
      const dataSet = [
        [[]],
        [['key1']],
        [['key1', 'key2']],
      ];

      dataSet.forEach(([keys], index) => {
        it('should throw error: case ' + (index + 1), () => {
          const scope = new Scope({}, new Scope());

          assert.throws(() => {
            scope.getValue(keys);
          }, Error);
        });
      })
    });

    describe('with variables', () => {
      const dataSet1 = [
        [{}, {key1: null}, ['key1'], null],
        [{}, {key1: true}, ['key1'], true],
        [{}, {key1: false}, ['key1'], false],
        [{}, {key1: 123}, ['key1'], 123],
        [{}, {key1: 'value1'}, ['key1'], 'value1'],

        [{keyX: 'a'}, {key1: null}, ['key1'], null],
        [{keyX: 'a'}, {key1: true}, ['key1'], true],
        [{keyX: 'a'}, {key1: false}, ['key1'], false],
        [{keyX: 'a'}, {key1: 123}, ['key1'], 123],
        [{keyX: 'a'}, {key1: 'value1'}, ['key1'], 'value1'],

        [{}, {key1: {key2: null}}, ['key1', 'key2'], null],
        [{}, {key1: {key2: true}}, ['key1', 'key2'], true],
        [{}, {key1: {key2: false}}, ['key1', 'key2'], false],
        [{}, {key1: {key2: 123}}, ['key1', 'key2'], 123],
        [{}, {key1: {key2: 'value2'}}, ['key1', 'key2'], 'value2'],
      ];

      dataSet1.forEach(([currentVariables, parentVariables, keys, value], index) => {
        it('should get value from parent scope: case ' + (index + 1), () => {
          const scope = new Scope(currentVariables, new Scope(parentVariables));

          assert.deepStrictEqual(scope.getValue(keys), value);
        });
      });

      const dataSet2 = [
        [{keyX: {keyY: 'a'}}, {key1: {keyZ: null}}, ['key1', 'key2']],
        [{keyX: {keyY: 'a'}}, {key1: {keyZ: true}}, ['key1', 'key2']],
        [{keyX: {keyY: 'a'}}, {key1: {keyZ: false}}, ['key1', 'key2']],
        [{keyX: {keyY: 'a'}}, {key1: {keyZ: 123}}, ['key1', 'key2']],
        [{keyX: {keyY: 'a'}}, {key1: {keyZ: 'value2'}}, ['key1', 'key2']],

        [{key1: {keyX: 'a'}}, {key1: {key2: null}}, ['key1', 'key2']],
        [{key1: {keyX: 'a'}}, {key1: {key2: true}}, ['key1', 'key2']],
        [{key1: {keyX: 'a'}}, {key1: {key2: false}}, ['key1', 'key2']],
        [{key1: {keyX: 'a'}}, {key1: {key2: 123}}, ['key1', 'key2']],
        [{key1: {keyX: 'a'}}, {key1: {key2: 'value2'}}, ['key1', 'key2']],
      ];

      dataSet2.forEach(([currentVariables, parentVariables, keys], index) => {
        it('should not get value: case ' + (index + 1), () => {
          const scope = new Scope(currentVariables, new Scope(parentVariables));

          assert.throws(() => {
            scope.getValue(keys);
          }, Error);
        });
      });
    })
  });
});
