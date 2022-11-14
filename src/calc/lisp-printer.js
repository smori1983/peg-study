/**
 * Output AST with Lisp like format.
 *
 * @param {Object} node
 * @return {string}
 */
const run = (node) => {
  const outputs = [];

  visit(node, outputs);

  return outputs.join('');
};

/**
 * @param {Object} node
 * @param {string[]} outputs
 */
const visit = (node, outputs) => {
  if (['+', '-', '*', '/'].includes(node.text)) {
    outputs.push('(');
    outputs.push(node.text);
    outputs.push(' ');
    visit(node.children[0], outputs);
    outputs.push(' ');
    visit(node.children[1], outputs);
    outputs.push(')');
  } else {
    outputs.push(node.text);
  }
};

module.exports.run = run;
