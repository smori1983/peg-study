/**
 * @param {string} type
 * @param {string|number} text
 * @param {Object[]} children
 * @return {Object}
 */
const create = (type, text, children) => {
  return {
    type,
    text,
    children,
  }
};

/**
 * @param {Object} target
 * @param {Object} replacer
 */
const replace = (target, replacer) => {
  target.type = replacer.type;
  target.text = replacer.text;
  target.children = replacer.children;
};

/**
 * @param {Object} node
 * @return {Object}
 */
const duplicate = (node) => {
  return JSON.parse(JSON.stringify(node));
}

module.exports.create = create;
module.exports.replace = replace;
module.exports.duplicate = duplicate;
