const helper = require('./helper');

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
      const newNode = helper.createNode('number', '+', [
        helper.createNode('multi', '*', [node.children[0].children[0], node.children[1]]),
        helper.createNode('multi', '*', [node.children[0].children[1], node.children[1]]),
      ]);
      helper.replaceNode(node, newNode);
    } else if (node.children[1].text === '+') {
      const newNode = helper.createNode('number', '+', [
        helper.createNode('multi', '*', [node.children[0], node.children[1].children[0]]),
        helper.createNode('multi', '*', [node.children[0], node.children[1].children[1]]),
      ]);
      helper.replaceNode(node, newNode);
    }
  }

  visit(node.children[0]);
  visit(node.children[1]);
};

module.exports.visit = visit;
