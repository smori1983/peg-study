/**
 * @param {string} type
 * @param {string|number} text
 * @param {Object} attributes
 * @param {Object[]} children
 * @return {Object}
 */
const create = (type, text, attributes, children) => {
  return {
    type,
    text,
    attributes,
    children,
  };
};

/**
 * @param {Object} target
 * @param {Object} replacer
 */
const replace = (target, replacer) => {
  target.type = replacer.type;
  target.text = replacer.text;
  target.attributes = replacer.attributes;
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
