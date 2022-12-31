/**
 * @typedef {import('./scope')} Scope
 */

/**
 * @param {Object} node
 * @param {Scope} scope
 */
const run = (node, scope) => {
  return visit(node, scope);
};

/**
 * @param {Object} node
 * @param {Scope} scope
 * @return {*}
 */
const visit = (node, scope) => {
  if (node.type === 'bool') {
    return node.text === 'true';
  }

  if (node.type === 'int') {
    return parseInt(node.text, 10);
  }

  if (node.type === 'float') {
    return parseFloat(node.text);
  }

  if (node.type === 'string') {
    return node.text;
  }

  if (node.type === 'variable') {
    return scope.getValue(prepareVariable(node));
  }

  const left = visit(node.children[0], scope);
  const right = visit(node.children[1], scope);

  if (node.type === 'logical' && ['&&', 'and'].includes(node.text)) {
    return left && right;
  }

  if (node.type === 'logical' && ['||', 'or'].includes(node.text)) {
    return left || right;
  }

  if (node.type === 'comparative' && node.text === '==') {
    return left === right;
  }

  if (node.type === 'comparative' && node.text === '!=') {
    return left !== right;
  }

  if (node.type === 'comparative' && node.text === '>=') {
    return left >= right;
  }

  if (node.type === 'comparative' && node.text === '>') {
    return left > right;
  }

  if (node.type === 'comparative' && node.text === '<=') {
    return left <= right;
  }

  if (node.type === 'comparative' && node.text === '<') {
    return left < right;
  }

  throw new Error('unknown node: ' + node.type + '(' + node.text + ')');
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
