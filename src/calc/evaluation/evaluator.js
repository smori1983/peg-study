const Scope = require('./scope');

/**
 * @param {Object} node
 * @param {Object} [variables]
 */
const run = (node, variables) => {
  const scope = new Scope(variables);

  return visit(node, scope);
};

/**
 * @param {Object} node
 * @param {Scope} scope
 * @return {number}
 */
const visit = (node, scope) => {
  if (node.type === 'number') {
    return parseInt(node.text, 10);
  }

  if (node.type === 'variable') {
    return scope.getValue([node.text]);
  }

  const left = visit(node.children[0], scope);
  const right = visit(node.children[1], scope);

  if (node.type === 'add' && node.text === '+') {
    return left + right;
  }

  if (node.type === 'add' && node.text === '-') {
    return left - right;
  }

  if (node.type === 'multi' && node.text === '*') {
    return left * right;
  }

  if (node.type === 'multi' && node.text === '/') {
    return left / right;
  }
};

module.exports.run = run;
