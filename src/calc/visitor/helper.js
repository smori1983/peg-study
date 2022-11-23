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

module.exports.createNode = createNode;
