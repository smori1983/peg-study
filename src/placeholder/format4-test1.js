const parser = require('./format4');
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

const input1 = `
#[test] #
##{test} #{value} #
`;
dump(input1);
