/**
 * @param {string} type
 * @param {string|number} text
 * @param {Object[]} children
 * @return {Object}
 */
const createNode = (type, text, children) => {
  return {
    type,
    text,
    children,
  }
}

/**
 * @param {Object} target
 * @param {Object} replacer
 */
const replaceNode = (target, replacer) => {
  target.type = replacer.type;
  target.text = replacer.text;
  target.children = replacer.children;
};

module.exports.createNode = createNode;
module.exports.replaceNode = replaceNode;
