const MethodManager = require('./format1-manager');
const parser = require('./format1');

const manager = new MethodManager();

const variables = {
  code: 'hello, world',
  amount: 999,
};

const validate = (input) => {
  try {
    manager.validate(variables, parser.parse(input));
    console.log('passed');
  } catch (e) {
    console.log(e.message);
  }
};

const input0 = 'code.lower().split(",").join("-").upper()'
validate(input0);

const input1 = 'foo';
validate(input1);

const input2 = 'amount.upper()';
validate(input2);

const input3 = 'code.upper(true)';
validate(input3);

const input4 = 'code.split("-", true)';
validate(input4);

const input5 = 'code.split(3)';
validate(input5);

const input6 = 'code.split("-").lower()';
validate(input6);
