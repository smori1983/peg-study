/**
 * @param {Object} node
 * @return {Object}
 */
const get = (node) => {
  return addOperatorProcess(node);
};

/**
 * @param {Object} node1
 * @param {Object} node2
 * @return {boolean}
 */
const equal = (node1, node2) => {
  const digest1 = JSON.stringify(get(node1));
  const digest2 = JSON.stringify(get(node2));

  return digest1 === digest2;
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

  list['+'].sort(sortListItems);
  list['-'].sort(sortListItems);

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
  if (['number', 'variable'].includes(node.type)) {
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

  list['*'].sort(sortListItems);
  list['/'].sort(sortListItems);

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
  if (['number', 'variable'].includes(node.type)) {
    list[operator].push(node.text);
  } else if (node.type === 'multi') {
    multiOperatorVisit(node, list, divisionCount);
  } else {
    const subList = addOperatorProcess(node);
    list[operator].push(subList);
  }
};

/**
 * @param {number|Object} a
 * @param {number|Object} b
 * @return {number}
 */
const sortListItems = (a, b) => {
  return JSON.stringify(a) > JSON.stringify(b) ? 1 : -1;
};

module.exports.get = get;
module.exports.equal = equal;
