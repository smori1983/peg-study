/**
 * @param {Object} node
 */
const addOperatorProcess = (node) => {
  const list = {
    '+': [],
    '-': [],
  };

  addOperatorVisit(node, list);

  list['+'].sort();
  list['-'].sort();

  return list;
};

const addOperatorVisit = (node, list) => {
  if (node.text === '+') {
    addOperatorVisitChild('+', node.children[0], list);
    addOperatorVisitChild('+', node.children[1], list);
  } else if (node.text === '-') {
    addOperatorVisitChild('+', node.children[0], list);
    addOperatorVisitChild('-', node.children[1], list);
  } else {
    addOperatorVisitChild('+', node, list);
  }
};

const addOperatorVisitChild = (operator, node, list) => {
  if (node.type === 'number') {
    list[operator].push(node.text);
  } else if (node.type === 'multi') {
    const subList = multiOperatorProcess(node);
    list[operator].push(subList);
  } else {
    addOperatorVisit(node, list);
  }
};

const multiOperatorProcess = (node) => {
  const list = {
    '*': [],
    '/': [],
  };

  multiOperatorVisit(node, list, 0);

  list['*'].sort();
  list['/'].sort();

  return list;
};

const multiOperatorVisit = (node, list, divisionCount) => {
  if (node.text === '*') {
    if (divisionCount % 2 === 0) {
      multiOperatorVisitChild('*', node.children[0], list, divisionCount);
      multiOperatorVisitChild('*', node.children[1], list, divisionCount);
    } else {
      multiOperatorVisitChild('/', node.children[0], list, divisionCount);
      multiOperatorVisitChild('/', node.children[1], list, divisionCount);
    }
  } else if (node.text === '/') {
    if (divisionCount % 2 === 0) {
      multiOperatorVisitChild('*', node.children[0], list, divisionCount);
      multiOperatorVisitChild('/', node.children[1], list, divisionCount + 1);
    } else {
      multiOperatorVisitChild('/', node.children[0], list, divisionCount);
      multiOperatorVisitChild('*', node.children[1], list, divisionCount + 1);
    }
  }
};

const multiOperatorVisitChild = (operator, node, list, divisionCount) => {
  if (node.type === 'number') {
    list[operator].push(node.text);
  } else if (node.type === 'multi') {
    multiOperatorVisit(node, list, divisionCount);
  } else {
    const subList = addOperatorProcess(node);
    list[operator].push(subList);
  }
};

module.exports.execute = addOperatorProcess;
