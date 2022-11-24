const helper = require('./helper');

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
    helper.replaceNode(node, helper.createNode('number', left.text * right.text, [null, null]));
  } else if (node.text === '/') {
    helper.replaceNode(node, helper.createNode('number', left.text / right.text, [null, null]));
  } else if (node.text === '+') {
    helper.replaceNode(node, helper.createNode('number', left.text + right.text, [null, null]));
  } else if (node.text === '-') {
    helper.replaceNode(node, helper.createNode('number', left.text - right.text, [null, null]));
  }
};

module.exports.visit = visit;
