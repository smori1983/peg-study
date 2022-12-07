/**
 * @param {Object} node
 * @return {Object}
 */
const get = (node) => {
  return addOperatorProcess(node);
};

/**
 * @param {Object} node
 */
const addOperatorProcess = (node) => {
  const list = {
    '+': [],
    '-': [],
  };

  addOperatorVisit(node, list, 0);

  list['+'].sort();
  list['-'].sort();

  return list;
};

const addOperatorVisit = (node, list, subtractionCount) => {
  if (node.text === '+') {
    if (subtractionCount % 2 === 0) {
      addOperatorVisitChild('+', node.children[0], list, subtractionCount);
      addOperatorVisitChild('+', node.children[1], list, subtractionCount);
    } else {
      addOperatorVisitChild('-', node.children[0], list, subtractionCount);
      addOperatorVisitChild('-', node.children[1], list, subtractionCount);
    }
  } else if (node.text === '-') {
    if (subtractionCount % 2 === 0) {
      addOperatorVisitChild('+', node.children[0], list, subtractionCount);
      addOperatorVisitChild('-', node.children[1], list, subtractionCount + 1);
    } else {
      addOperatorVisitChild('-', node.children[0], list, subtractionCount);
      addOperatorVisitChild('+', node.children[1], list, subtractionCount + 1);
    }
  } else {
    addOperatorVisitChild('+', node, list, subtractionCount);
  }
};

const addOperatorVisitChild = (operator, node, list, subtractionCount) => {
  if (node.type === 'number') {
    list[operator].push(node.text);
  } else if (node.type === 'multi') {
    const subList = multiOperatorProcess(node);
    list[operator].push(subList);
  } else {
    addOperatorVisit(node, list, subtractionCount);
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

module.exports.get = get;
