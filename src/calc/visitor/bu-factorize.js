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

  if (node.text === '+' && left.text === '*' && right.text === '*') {
    if (typeof left.children[0].text === 'number' && left.children[0].text === right.children[0].text) {
      const newNode = createNode('*', [
        createNode(left.children[0].text, [null, null]),
        createNode('+', [left.children[1], right.children[1]]),
      ]);
      node.text = newNode.text;
      node.children = newNode.children;
      visit(node.children[1]);
    } else if (typeof left.children[0].text === 'number' && left.children[0].text === right.children[1].text) {
      const newNode = createNode('*', [
        createNode(left.children[0].text, [null, null]),
        createNode('+', [left.children[1], right.children[0]]),
      ]);
      node.text = newNode.text;
      node.children = newNode.children;
      visit(node.children[1]);
    } else if (typeof left.children[1].text === 'number' && left.children[1].text === right.children[0].text) {
      const newNode = createNode('*', [
        createNode(left.children[1].text, [null, null]),
        createNode('+', [left.children[0], right.children[1]]),
      ]);
      node.text = newNode.text;
      node.children = newNode.children;
      visit(node.children[0]);
    } else if (typeof left.children[1].text === 'number' && left.children[1].text === right.children[1].text) {
      const newNode = createNode('*', [
        createNode(left.children[1].text, [null, null]),
        createNode('+', [left.children[0], right.children[0]]),
      ]);
      node.text = newNode.text;
      node.children = newNode.children;
      visit(node.children[0]);
    }
  }
};

const createNode = (text, children) => {
  return {
    text,
    children,
  };
};

module.exports.visit = visit;
