/**
 * @param {Object} node
 */
const execute = (node) => {
  const list = {
    '+': [],
    '-': [],
  };

  foo(node, list);

  list['+'].sort();
  list['-'].sort();

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

  fooMulti(node, list, 0);

  list['*'].sort();
  list['/'].sort();

  return list;
};

const fooMulti = (node, list, divisionCount) => {
  if (node === null) {
    return;
  }

  if (node.text === '*') {
    if (divisionCount % 2 === 0) {
      multi('*', node.children[0], list, divisionCount);
      multi('*', node.children[1], list, divisionCount);
    } else {
      multi('/', node.children[0], list, divisionCount);
      multi('/', node.children[1], list, divisionCount);
    }
  } else if (node.text === '/') {
    divisionCount++;
    if (divisionCount % 2 === 0) {
      multi('/', node.children[0], list, divisionCount);
      multi('*', node.children[1], list, divisionCount);
    } else {
      multi('*', node.children[0], list, divisionCount);
      multi('/', node.children[1], list, divisionCount);
    }
  }
};

const multi = (operator, node, list, divisionCount) => {
  if (node.type === 'number') {
    list[operator].push(node.text);
  } else if (node.type === 'multi') {
    fooMulti(node, list, divisionCount);
  } else {
    const subList = execute(node);
    list[operator].push(subList);
  }
};

module.exports.execute = execute;
