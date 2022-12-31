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
    nodeHelper.replace(node, nodeHelper.create('number', left.text * right.text, {}, []));
  } else if (node.text === '/') {
    nodeHelper.replace(node, nodeHelper.create('number', left.text / right.text, {}, []));
  } else if (node.text === '+') {
    nodeHelper.replace(node, nodeHelper.create('number', left.text + right.text, {}, []));
  } else if (node.text === '-') {
    nodeHelper.replace(node, nodeHelper.create('number', left.text - right.text, {}, []));
  }
};

module.exports.visit = visit;
