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
    node.text = left.text * right.text;
    node.children = [null, null];
  } else if (node.text === '/') {
    node.text = left.text / right.text;
    node.children = [null, null];
  } else if (node.text === '+') {
    node.text = left.text + right.text;
    node.children = [null, null];
  } else if (node.text === '-') {
    node.text = left.text - right.text;
    node.children = [null, null];
  }
};

module.exports.visit = visit;
