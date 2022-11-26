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

  const left = node.children[0];
  const right = node.children[1];

  if (node.text === '+' && left.text === '*' && right.text === '*') {
    const subtreeLeft = collectSubtree(left);
    const subtreeRight = collectSubtree(right);
    const commonSubtree = findCommonSubtree(subtreeLeft, subtreeRight);

    if (commonSubtree !== null) {
      rewrite(left, commonSubtree);
      rewrite(right, commonSubtree);
      const newNode = helper.createNode('multi', '*', [
        commonSubtree,
        helper.createNode('add', '+', [left, right]),
      ]);
      helper.replaceNode(node, newNode);
    }
  }

  visit(node.children[0]);
  visit(node.children[1]);
};

/**
 * @param {Object} node
 * @return {string[]}
 */
const collectSubtree = (node) => {
  let result = [];

  if (node !== null) {
    if (node.text === '*') {
      result.push(node.children[0]);
      result = result.concat(collectSubtree(node.children[0]));

      result.push(node.children[1]);
      result = result.concat(collectSubtree(node.children[1]));
    }
  }

  return result;
}

/**
 * @param {string[]} subtree1
 * @param {string[]} subtree2
 * @return {string|null}
 */
const findCommonSubtree = (subtree1, subtree2) => {
  for (let i1 = 0; i1 < subtree1.length; i1++) {
    for (let i2 = 0; i2 < subtree2.length; i2++) {
      if (helper.toLisp(subtree1[i1]) === helper.toLisp(subtree2[i2])) {
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
    target: helper.toLisp(subtree),
    done: false,
  });
};

/**
 * @param {Object} node
 * @param {{target: string, done: boolean}} data
 */
const rewriteVisit = (node, data) => {
  if (node !== null && data.done === false) {
    if (node.text === '*') {
      if (helper.toLisp(node.children[0]) === data.target) {
        helper.replaceNode(node, node.children[1]);
        data.done = true;
      } else if (helper.toLisp(node.children[1]) === data.target) {
        helper.replaceNode(node, node.children[0]);
        data.done = true;
      } else {
        rewriteVisit(node.children[0], data);
        rewriteVisit(node.children[1], data);
      }
    }
  }
};

module.exports.visit = visit;
