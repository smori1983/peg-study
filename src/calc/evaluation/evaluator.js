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
    return scope.getValue(prepareVariable(node));
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

const prepareVariable = (node) => {
  const keys = [];

  keys.push(node.text);

  visitProperty(node.children[0], keys);

  return keys;
};

const visitProperty = (node, keys) => {
  if (node && node.type === 'property') {
    keys.push(node.text);

    visitProperty(node.children[0], keys);
  }
};

module.exports.run = run;
