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

    visitChild('left', node.children[0], operators, outputs);

    outputs.push(' ');
    outputs.push(node.text);
    outputs.push(' ');

    visitChild('right', node.children[1], operators, outputs);

    operators.pop();
  } else if (['number', 'variable'].includes(node.type)) {
    outputs.push(node.text);
  }
};

/**
 * @param {string} position
 * @param {Object} node
 * @param {string[]} operators
 * @param {string[]} outputs
 */
const visitChild = (position, node, operators, outputs) => {
  const parenthesis = needParenthesis(position, node, operators);

  if (parenthesis) {
    outputs.push('(');
  }

  visit(node, operators, outputs);

  if (parenthesis) {
    outputs.push(')');
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
    } else if (position === 'right' && ['add', 'multi'].includes(node.type)) {
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
