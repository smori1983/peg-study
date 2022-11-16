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
    if (left.text === 0 || right.text === 0) {
      node.text = 0;
      node.children = [null, null];
    }
  }
};

module.exports.visit = visit;
