const digest = require('./subtree-digest');

/**
 * @param {Object} node
 * @return {Object}
 */
module.exports.getDigest = (node) => {
  return digest.get(node);
}
