const parser = require('./format2');
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
    console.log(JSON.stringify(parser.parse(text, option), null, 2));
  } catch (e) {
    const reporter = new ErrorReporter(text, e);
    console.log(reporter.getOriginalMessage());
    console.log(reporter.getCodeAsPlainText());
  }
}

const input1 = '#{value1}';
dump(input1);

const input2 = '${value1}';
dump(input2);

const input3 = '#[value1]';
dump(input3);

const input4 = '#{!value1}';
dump(input4);
