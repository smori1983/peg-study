/**
 * Term rewriting
 *
 * Type: top down
 *
 * @param {Object} node
 */
const visit = (node) => {
  if (node === null) {
    return;
  }

  if (node.text === '*') {
    if (node.children[0].text === '+') {
      const newNode = createNode('+', [
        createNode('*', [node.children[0].children[0], node.children[1]]),
        createNode('*', [node.children[0].children[1], node.children[1]]),
      ]);
      node.text = newNode.text;
      node.children = newNode.children;
    } else if (node.children[1].text === '+') {
      const newNode = createNode('+', [
        createNode('*', [node.children[0], node.children[1].children[0]]),
        createNode('*', [node.children[0], node.children[1].children[1]]),
      ]);
      node.text = newNode.text;
      node.children = newNode.children;
    }
  }

  visit(node.children[0]);
  visit(node.children[1]);
};

const createNode = (text, children) => {
  return {
    text,
    children,
  };
};

module.exports.visit = visit;
