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
      node.text = right.text;
      node.children = right.children;
    } else if (right.text === 1) {
      node.text = left.text;
      node.children = left.children;
    }
  }
};

module.exports.visit = visit;
