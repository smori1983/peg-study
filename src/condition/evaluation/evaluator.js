/**
 * @typedef {import('./scope')} Scope
 */

const run = (node, scope) => {
  /**
   * @type {string[]}
   */
  const logs = [];

  visit(node, scope, logs);

  return logs;
};

/**
 * @param {Object} node
 * @param {Scope} scope
 * @param {string[]} logs
 */
const visit = (node, scope, logs) => {
  if (node.type === 'condition_block') {
    const block = runBlock(node, scope);

    if (Array.isArray(block)) {
      block.forEach((node) => {
        visit(node, scope, logs);
      })
    }
  }

  if (node.type === 'builtin' && node.text === 'log') {
    const args = node.attributes.arguments.map((argument) => {
      return visitArgument(argument, scope);
    });

    logs.push(args.join(''));
  }
};

const visitArgument = (node, scope) => {
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
};

/**
 * @param {Object} node
 * @param {Scope} scope
 * @return {(Object[]|null)}
 */
const runBlock = (node, scope) => {
  const children = node.children;

  if (children[0].type === 'condition' && children[0].text === 'if') {
    if (runCondition(children[0].attributes.condition, scope)) {
      return children[0].children;
    }
  }

  for (let i = 1; i < children.length; i++) {
    if (children[i].type === 'condition' && children[i].text === 'elseif') {
      if (runCondition(children[i].attributes.condition, scope)) {
        return children[i].children;
      }
    }

    if (children[i].type === 'condition' && children[i].text === 'else') {
      return children[i].children;
    }
  }

  return null;
};

/**
 * @param {Object} node
 * @param {Scope} scope
 */
const runCondition = (node, scope) => {
  return visitCondition(node, scope);
};

/**
 * @param {Object} node
 * @param {Scope} scope
 * @return {*}
 */
const visitCondition = (node, scope) => {
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

  const left = visitCondition(node.children[0], scope);
  const right = visitCondition(node.children[1], scope);

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
module.exports.runBlock = runBlock;
module.exports.runCondition = runCondition;
