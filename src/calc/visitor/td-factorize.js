const nodeHelper = require('../helper/node');
const subtreeHelper = require('../helper/subtree');

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

  const left = node.children[0];
  const right = node.children[1];

  if (node.text === '+' && left.type === 'multi' && right.type === 'multi') {
    const subtreeLeft = collectSubtree(left);
    const subtreeRight = collectSubtree(right);
    const commonSubtree = findCommonSubtree(subtreeLeft, subtreeRight);

    if (commonSubtree !== null) {
      rewrite(left, commonSubtree);
      rewrite(right, commonSubtree);
      const newNode = nodeHelper.create('multi', '*', [
        commonSubtree,
        nodeHelper.create('add', '+', [left, right]),
      ]);
      nodeHelper.replace(node, newNode);
    }
  }

  visit(node.children[0]);
  visit(node.children[1]);
};

/**
 * @param {Object} node
 * @return {Object[]}
 */
const collectSubtree = (node) => {
  let result = [];

  if (node !== null) {
    if (node.text === '*') {
      result.push(node.children[0]);
      result.push(node.children[1]);
    }

    if (node.type === 'multi') {
      result = result.concat(collectSubtree(node.children[0]));
      result = result.concat(collectSubtree(node.children[1]));
    }
  }

  return result;
}

/**
 * @param {Object[]} subtree1
 * @param {Object[]} subtree2
 * @return {(Object|null)}
 */
const findCommonSubtree = (subtree1, subtree2) => {
  for (let i1 = 0; i1 < subtree1.length; i1++) {
    for (let i2 = 0; i2 < subtree2.length; i2++) {
      const digest1 = JSON.stringify(subtreeHelper.getDigest(subtree1[i1]));
      const digest2 = JSON.stringify(subtreeHelper.getDigest(subtree2[i2]));
      if (digest1 === digest2) {
        return subtree1[i1];
      }
    }
  }

  return null;
};

/**
 * @param {Object} node
 * @param {Object} subtree
 */
const rewrite = (node, subtree) => {
  rewriteVisit(node, {
    target: JSON.stringify(subtreeHelper.getDigest(subtree)),
    done: false,
  });
};

/**
 * @param {Object} node
 * @param {{target: string, done: boolean}} data
 */
const rewriteVisit = (node, data) => {
  if (node !== null && data.done === false) {
    if (node.type === 'multi') {
      if (JSON.stringify(subtreeHelper.getDigest(node.children[0])) === data.target) {
        nodeHelper.replace(node, node.children[1]);
        data.done = true;
      } else if (JSON.stringify(subtreeHelper.getDigest(node.children[1])) === data.target) {
        nodeHelper.replace(node, node.children[0]);
        data.done = true;
      } else {
        rewriteVisit(node.children[0], data);
        rewriteVisit(node.children[1], data);
      }
    }
  }
};

module.exports.visit = visit;
