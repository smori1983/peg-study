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

/**
 * @param {Object} node
 */
const toLisp = (node) => {
  const outputs = [];

  toLispVisit(node, outputs);

  return outputs.join('');
};

/**
 * @param {Object} node
 * @param {string[]} outputs
 */
const toLispVisit = (node, outputs) => {
  if (['+', '-', '*', '/'].includes(node.text)) {
    outputs.push('(');
    outputs.push(node.text);
    node.children.forEach((child) => {
      outputs.push(' ');
      toLispVisit(child, outputs);
    });
    outputs.push(')');
  } else if (outputs.length === 0) {
    outputs.push('(');
    outputs.push(node.text);
    outputs.push(')');
  } else {
    outputs.push(node.text);
  }
};

module.exports.createNode = createNode;
module.exports.replaceNode = replaceNode;
module.exports.toLisp = toLisp;
