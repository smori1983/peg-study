const nodeHelper = require('../helper/node');
const digest = require('../helper/digest');

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

  if ((node.type === 'add' && node.text === '+') && left.type === 'multi' && right.type === 'multi') {
    const subtreeLeft = collectSubtree(left);
    const subtreeRight = collectSubtree(right);
    const commonSubtree = findCommonSubtree(subtreeLeft, subtreeRight);

    if (commonSubtree !== null) {
      rewrite(left, commonSubtree);
      rewrite(right, commonSubtree);
      const newNode = nodeHelper.create('multi', '*', {}, [
        commonSubtree,
        nodeHelper.create('add', '+', {}, [left, right]),
      ]);
      nodeHelper.replace(node, newNode);
    }
  }

  visit(node.children[0]);
  visit(node.children[1]);
};

/**
 * Collect whole subtree and child subtrees.
 *
 * @param {Object} node
 * @return {Object[]}
 */
const collectSubtree = (node) => {
  return [node].concat(collectSubtreeInternal(node));
};

/**
 * @param {Object} node
 * @return {Object[]}
 */
const collectSubtreeInternal = (node) => {
  let result = [];

  if (node !== null) {
    if (node.type === 'multi') {
      if (node.text === '*') {
        result.push(node.children[0]);
        result.push(node.children[1]);
      }

      result = result.concat(collectSubtreeInternal(node.children[0]));
      result = result.concat(collectSubtreeInternal(node.children[1]));
    }
  }

  return result;
};

/**
 * @param {Object[]} subtree1
 * @param {Object[]} subtree2
 * @return {(Object|null)}
 */
const findCommonSubtree = (subtree1, subtree2) => {
  for (let i1 = 0; i1 < subtree1.length; i1++) {
    for (let i2 = 0; i2 < subtree2.length; i2++) {
      if (digest.equal(subtree1[i1], subtree2[i2])) {
        // If found, return object duplicated from first subtree.
        return nodeHelper.duplicate(subtree1[i1]);
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
  const data = {
    target: subtree,
    done: false,
  };

  rewriteVisit(node, data);

  if (data.done === false) {
    throw new Error('Term rewriting failed, something wrong.');
  }
};

/**
 * @param {Object} node
 * @param {{target: Object, done: boolean}} data
 */
const rewriteVisit = (node, data) => {
  if (node !== null && data.done === false) {
    if (node.type === 'multi') {
      if (digest.equal(node, data.target)) {
        nodeHelper.replace(node, nodeHelper.create('number', 1, {}, [null, null]));
        data.done = true;
      } else if (digest.equal(node.children[0], data.target)) {
        nodeHelper.replace(node, node.children[1]);
        data.done = true;
      } else if (digest.equal(node.children[1], data.target)) {
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
