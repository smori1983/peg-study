/**
 * Output AST with Lisp like format.
 *
 * @param {Object} node
 * @return {string}
 */
const get = (node) => {
  const outputs = [];

  visit(node, outputs);

  return outputs.join('');
};

/**
 * @param {Object} node
 * @param {string[]} outputs
 */
const visit = (node, outputs) => {
  if (['add', 'multi'].includes(node.type)) {
    outputs.push('(');
    outputs.push(node.text);
    node.children.forEach((child) => {
      outputs.push(' ');
      visit(child, outputs);
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

module.exports.get = get;
