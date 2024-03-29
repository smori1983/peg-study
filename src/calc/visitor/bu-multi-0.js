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
    if (left.text === '0' || right.text === '0') {
      nodeHelper.replace(node, nodeHelper.create('number', '0', {}, []));
    }
  } else if (node.text === '/') {
    if (left.text === '0' && (right.type === 'number' && right.text !== '0')) {
      nodeHelper.replace(node, nodeHelper.create('number', '0', {}, []));
    }
  }
};

module.exports.visit = visit;
