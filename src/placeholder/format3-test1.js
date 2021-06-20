const parser = require('./format3');
const ErrorReporter = require('../error/error-reporter');

/**
 * @param {string} input
 */
const dump = (input) => {
  const option = {
    placeholder_mark: '#',
    bracket_open: '{',
    bracket_close: '}',
  };
  const text = input.trim();

  try {
    console.log(text);
    console.log(JSON.stringify(parser.parse(text, option), null, 2));
  } catch (e) {
    const reporter = new ErrorReporter(text, e);
    console.log(reporter.getOriginalMessage());
    console.log(reporter.getCodeAsPlainText());
  }
};

const input1 = '#{value}';
dump(input1);

const input2 = 'hello, #{value}';
dump(input2);

const input3 = 'hello, ##{value}';
dump(input3);

const input4 = 'hello, # #{value}';
dump(input4);

const input5 = 'hello, # {value}';
dump(input5);

const input6 = '#hello, #{value}';
dump(input6);

const input7 = 'hello, #{value} #';
dump(input7);

const input8 = '#[test] #{value}';
dump(input8);

const input9 = '#{value1} #{value2}';
dump(input9);
