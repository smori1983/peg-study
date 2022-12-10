const digest = require('./subtree-digest');
const lisp = require('./subtree-lisp');

/**
 * @param {Object} node
 * @return {Object}
 */
module.exports.getDigest = (node) => {
  return digest.get(node);
};

/**
 * @param {Object} node1
 * @param {Object} node2
 * @return {boolean}
 */
module.exports.equalDigest = (node1, node2) => {
  const digest1 = JSON.stringify(digest.get(node1));
  const digest2 = JSON.stringify(digest.get(node2));

  return digest1 === digest2;
};

/**
 * @param {Object} node
 * @return {string}
 */
module.exports.toLisp = (node) => {
  return lisp.get(node);
};
