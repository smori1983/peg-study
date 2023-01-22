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

  if (node.type === 'add' && node.text === '+') {
    if (isZero(left) && isZero(right)) {
      nodeHelper.replace(node, nodeHelper.create('number', '0', {}, []));
    } else if (isZero(left)) {
      nodeHelper.replace(node, right);
    } else if (isZero(right)) {
      nodeHelper.replace(node, left);
    }
  } else if (node.type === 'add' && node.text === '-') {
    if (isZero(right)) {
      nodeHelper.replace(node, left);
    }
  }
};

/**
 * @param {Object} node
 * @return {boolean}
 */
const isZero = (node) => {
  return node.type === 'number' && ['0', '-0'].includes(node.text);
};

module.exports.visit = visit;
