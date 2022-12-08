const nodeHelper = require('../helper/node');

/**
 * Term rewriting
 *
 * Type: bottom up
 *
 * @param {Object} node
 */
const visit = (node) => {
  if (node === null) {
    return;
  }

  const left = node.children[0];
  const right = node.children[1];

  visit(left);
  visit(right);

  if (node.text === '*') {
    if (left.text === 1) {
      nodeHelper.replace(node, right);
    } else if (right.text === 1) {
      nodeHelper.replace(node, left);
    }
  } else if (node.text === '/') {
    if (right.text === 1) {
      nodeHelper.replace(node, left);
    }
  }
};

module.exports.visit = visit;
