const parser = require('./format2');
const Manager = require('./format2-manager');
const ErrorReporter = require('../error/error-reporter-runtime');

const dump = (input) => {
  const manager = new Manager();
  try {
    console.log(input);
    const result = manager.invoke(variables, parser.parse(input));
    console.log(result);
  } catch (e) {
    const reporter = new ErrorReporter(input, e);
    console.log(reporter.getOriginalMessage());
    console.log(reporter.getCodeAsPlainText());
  }
};

const variables = {
  code: 'ABC-123',
};

const input0 = 'code.split("-").join("_")';
dump(input0);

const input1 = 'foo.lower()';
dump(input1);

const input2 = 'code.foo()';
dump(input2);

const input3 = 'code.join("")';
dump(input3);

const input4 = 'code.lower().join("")';
dump(input4);

const input5 = 'code.split()';
dump(input5);

const input6 = 'code.split(true)';
dump(input6);
