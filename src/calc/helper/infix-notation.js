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

    const parenthesisLeft = needParenthesis('left', node.children[0], operators);

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

    const parenthesisRight = needParenthesis('right', node.children[1], operators);

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
 * @param {string} position
 * @param {Object} node
 * @param {string[]} operators
 * @return {boolean}
 */
const needParenthesis = (position, node, operators) => {
  if (lookOperator(operators, 1) === '-') {
    if (position === 'right' && node.type === 'add') {
      return true;
    }
  }

  if (lookOperator(operators, 1) === '*') {
    if (node.type === 'add') {
      return true;
    }
  }

  if (lookOperator(operators, 1) === '/') {
    if (position === 'left' && node.type === 'add') {
      return true;
    } else if (position === 'right' && node.type !== 'number') {
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
