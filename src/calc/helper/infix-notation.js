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
    operators.push(node.text);

    const parenthesisLeft = needParenthesis(node.children[0], operators, 'left');

    if (parenthesisLeft) {
      outputs.push('(');
    }

    visit(node.children[0], operators, outputs);

    if (parenthesisLeft) {
      outputs.push(')');
    }

    outputs.push(' ');
    outputs.push(node.text);
    outputs.push(' ');

    const parenthesisRight = needParenthesis(node.children[1], operators, 'right');

    if (parenthesisRight) {
      outputs.push('(');
    }

    visit(node.children[1], operators, outputs);

    if (parenthesisRight) {
      outputs.push(')');
    }

    operators.pop();
  } else if (node.type === 'number') {
    outputs.push(node.text);
  }
};

/**
 * @param {Object} node
 * @param {string[]} operators
 * @param {string} position
 * @return {boolean}
 */
const needParenthesis = (node, operators, position) => {
  if (lookOperator(operators, 1) === '-') {
    if (node.type === 'add' && position === 'right') {
      return true;
    }
  }

  if (lookOperator(operators, 1) === '*') {
    if (node.type === 'add') {
      return true;
    }
  }

  if (lookOperator(operators, 1) === '/') {
    if (node.type !== 'number' && position === 'right') {
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
