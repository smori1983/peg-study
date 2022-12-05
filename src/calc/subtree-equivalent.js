/**
 * @param {Object} node
 */
const execute = (node) => {
  const list = {
    '+': [],
    '-': [],
  };

  foo(node, list);

  return list;
};

const foo = (node, list) => {
  if (node === null) {
    return;
  }

  if (node.text === '+') {
    add('+', node.children[0], list);
    add('+', node.children[1], list);
  } else if (node.text === '-') {
    add('+', node.children[0], list);
    add('-', node.children[1], list);
  } else {
    add('+', node, list);
  }
};

const add = (operator, node, list) => {
  if (node.type === 'number') {
    list[operator].push(node.text);
  } else if (node.type === 'multi') {
    const subList = executeMulti(node);
    list[operator].push(subList);
  } else {
    foo(node, list);
  }
};

const executeMulti = (node) => {
  const list = {'*': [], '/': []};

  fooMulti(node, list);

  return list;
};

const fooMulti = (node, list) => {
  if (node === null) {
    return;
  }

  if (node.text === '*') {
    multi('*', node.children[0], list);
    multi('*', node.children[1], list);
  }

  if (node.text === '/') {
    multi('*', node.children[0], list);
    multi('/', node.children[1], list);
  }
};

const multi = (operator, node, list) => {
  if (node.type === 'number') {
    list[operator].push(node.text);
  } else if (node.type === 'multi') {
    fooMulti(node, list);
  } else {
    const subList = execute(node);
    list[operator].push(subList);
  }
};

module.exports.execute = execute;
