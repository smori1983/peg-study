/**
 * @typedef {import('./scope')} Scope
 */

/**
 * @param {Object[]} nodes
 * @param {Scope} scope
 * @return {string}
 */
const run = (nodes, scope) => {
  const output = [];

  nodes.forEach((node) => {
    visit(node, scope, output);
  })

  return output.join('');
};

/**
 * @param {Object} node
 * @param {Scope} scope
 * @param {string[]} output
 */
const visit = (node, scope, output) => {
  if (node.type === 'variable') {
    output.push(scope.getValue([node.text]));
  }

  if (node.type === 'plain' || node.type === 'plain_fallback') {
    output.push(node.text);
  }
};

module.exports.run = run;
