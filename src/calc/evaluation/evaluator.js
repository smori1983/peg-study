/**
 * @param {Object} node
 */
const run = (node) => {
  return visit(node);
};

const visit = (node) => {
  if (node.type === 'number') {
    return node.text;
  }

  const left = visit(node.children[0]);
  const right = visit(node.children[1]);

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
