/**
 * Term rewriting
 *
 * Type: top down
 *
 * @param {Object} node
 */
const visit = (node) => {
  if (node === null) {
    return;
  }

  const left = node.children[0];
  const right = node.children[1];

  if (node.text === '+' && left.text === '*' && right.text === '*') {
    const operandsLeft = collectMultiOperands(left);
    const operandsRight = collectMultiOperands(right);
    const commonOperand = findCommonOperand(operandsLeft, operandsRight);

    if (typeof commonOperand === 'number') {
      rewrite(left, commonOperand);
      rewrite(right, commonOperand);
      const newNode = createNode('*', [
        createNode(commonOperand, [null, null]),
        createNode('+', [left, right]),
      ]);
      node.text = newNode.text;
      node.children = newNode.children;
    }
  }

  visit(node.children[0]);
  visit(node.children[1]);
};

const collectMultiOperands = (node) => {
  let result = [];

  if (node !== null) {
    if (typeof node.text === 'number') {
      result.push(node.text);
    } else if (node.text === '*') {
      result = result.concat(collectMultiOperands(node.children[0]));
      result = result.concat(collectMultiOperands(node.children[1]));
    }
  }

  return result;
}

/**
 * @param {number[]} operands1
 * @param {number[]} operands2
 * @return {number|null}
 */
const findCommonOperand = (operands1, operands2) => {
  const common = operands1.filter(value => operands2.includes(value));

  return (common.length > 0) ? common[0] : null;
}

const rewrite = (node, target) => {
  rewriteVisit(node, {
    target: target,
    done: false,
  });
};

/**
 * @param {Object} node
 * @param {{target: number, done: boolean}} data
 */
const rewriteVisit = (node, data) => {
  if (node !== null && data.done === false) {
    if (node.text === '*') {
      if (node.children[0].text === data.target) {
        const opposite = node.children[1];
        node.text = opposite.text;
        node.children = opposite.children;
        data.done = true;
      } else if (node.children[1].text === data.target) {
        const opposite = node.children[0];
        node.text = opposite.text;
        node.children = opposite.children;
        data.done = true;
      } else {
        rewriteVisit(node.children[0], data);
        rewriteVisit(node.children[1], data);
      }
    }
  }
}

const createNode = (text, children) => {
  return {
    text,
    children,
  };
};

module.exports.visit = visit;
