const digest = require('./subtree-digest');
const lisp = require('./subtree-lisp');

/**
 * @param {Object} node
 * @return {Object}
 */
module.exports.getDigest = (node) => {
  return digest.get(node);
}

/**
 * @param {Object} node
 * @return {string}
 */
module.exports.toLisp = (node) => {
  return lisp.get(node);
}
