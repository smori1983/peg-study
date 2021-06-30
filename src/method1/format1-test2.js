const MethodManager = require('./format1-manager');
const parser = require('./format1');

const manager = new MethodManager();

const variables = {
  code: 'hello, world',
  amount: 999,
};

const input1 = 'code';
console.log(manager.invoke(variables, parser.parse(input1)));

const input2 = 'code.upper()';
console.log(manager.invoke(variables, parser.parse(input2)));

const input3 = 'code.upper().lower()';
console.log(manager.invoke(variables, parser.parse(input3)));

const input4 = 'code.split(", ").join("+").upper()';
console.log(manager.invoke(variables, parser.parse(input4)));
