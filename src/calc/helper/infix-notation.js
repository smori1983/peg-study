/**
 * @param {Object} node
 */
const get = (node) => {
  const operators = [];
  const outputs = [];

  visit(node, operators, outputs);

  return outputs.join('');
};

/**
 * @param {Object} node
 * @param {string[]} operators
 * @param {string[]} outputs
 */
const visit = (node, operators, outputs) => {
  if (['add', 'multi'].includes(node.type)) {
    if (needParenthesis(node, operators)) {
      outputs.push('(');
    }

    operators.push(node.text);

    visit(node.children[0], operators, outputs);

    outputs.push(' ');
    outputs.push(node.text);
    outputs.push(' ');

    visit(node.children[1], operators, outputs);

    operators.pop();

    if (needParenthesis(node, operators)) {
      outputs.push(')');
    }
  } else if (node.type === 'number') {
    outputs.push(node.text);
  }
};

/**
 * @param {Object} node
 * @param {string[]} operators
 * @return {boolean}
 */
const needParenthesis = (node, operators) => {
  if (lookOperator(operators, 1) === '-') {
    if (node.type === 'add') {
      return true;
    }
  }

  if (lookOperator(operators, 1) === '*') {
    if (node.type === 'add') {
      return true;
    }
  }

  if (lookOperator(operators, 1) === '/') {
    if (node.type !== 'number') {
      return true;
    }
  }

  return false;
};

/**
 * @param {string[]} operators
 * @param {number} index
 * @return {(string|null)}
 */
const lookOperator = (operators, index) => {
  if (index > 0 && operators.length >= index) {
    return operators[operators.length - index];
  }

  return null;
};

module.exports.get = get;
