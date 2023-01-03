/**
 * @typedef {import('./scope')} Scope
 */

/**
 * @param {Object} node
 * @param {Scope} scope
 * @return {string}
 */
const run = (node, scope) => {
  const outputs = [];

  visit(node, scope, outputs);

  return outputs.join('');
};

/**
 * @param {Object} node
 * @param {Scope} scope
 * @param {string[]} outputs
 */
const visit = (node, scope, outputs) => {
  if (node.type === 'line_text') {
    node.children.forEach((child) => {
      visit(child, scope, outputs);
    });
  }

  if (node.type === 'variable') {
    outputs.push(scope.getValue([node.text]));
  }

  if (node.type === 'plain' || node.type === 'plain_fallback') {
    outputs.push(node.text);
  }
};

module.exports.run = run;
