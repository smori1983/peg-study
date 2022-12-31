const nodeHelper = require('../helper/node');

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
      const newNode = nodeHelper.create('number', '+', [
        nodeHelper.create('multi', '*', {}, [node.children[0].children[0], node.children[1]]),
        nodeHelper.create('multi', '*', {}, [node.children[0].children[1], node.children[1]]),
      ]);
      nodeHelper.replace(node, newNode);
    } else if (node.children[1].text === '+') {
      const newNode = nodeHelper.create('number', '+', [
        nodeHelper.create('multi', '*', {}, [node.children[0], node.children[1].children[0]]),
        nodeHelper.create('multi', '*', {}, [node.children[0], node.children[1].children[1]]),
      ]);
      nodeHelper.replace(node, newNode);
    }
  }

  visit(node.children[0]);
  visit(node.children[1]);
};

module.exports.visit = visit;
