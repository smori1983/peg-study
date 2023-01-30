const nodeHelper = require('../helper/node');

/**
 * Term rewriting
 *
 * Type: bottom up
 *
 * @param {Object} node
 */
const visit = (node) => {
  if (typeof node === 'undefined') {
    return;
  }

  const left = node.children[0];
  const right = node.children[1];

  visit(left);
  visit(right);

  if (node.text === '*') {
    if (isZero(left) || isZero(right)) {
      nodeHelper.replace(node, nodeHelper.create('number', '0', {}, []));
    }
  } else if (node.text === '/') {
    if (isZero(left) && (isNumber(right) && !isZero(right))) {
      nodeHelper.replace(node, nodeHelper.create('number', '0', {}, []));
    }
  }
};

/**
 * @param {Object} node
 * @return {boolean}
 */
const isNumber = (node) => {
  return node.type === 'number';
};

/**
 * @param {Object} node
 * @return {boolean}
 */
const isZero = (node) => {
  return isNumber(node) && ['0', '-0'].includes(node.text);
};

module.exports.visit = visit;
