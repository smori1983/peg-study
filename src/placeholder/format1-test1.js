const parser = require('./format1');
const ErrorReporter = require('../error/error-reporter');

/**
 * @param {string} input
 * @param {Object} option
 */
const dump = (input, option) => {
  const text = input.trim();
  try {
    console.log(JSON.stringify(parser.parse(text, option), null, 2));
  } catch (e) {
    const reporter = new ErrorReporter(text, e);
    console.log(reporter.getOriginalMessage());
    console.log(reporter.getCodeAsPlainText());
  }
}

const option1 = {
  delimiter_open: '{',
  delimiter_close: '}',
};

const input10 = '{value1}';
dump(input10, option1);
const input11 = '!{value1}';
dump(input11, option1);
const input12 = '{!value1}';
dump(input12, option1);
const input13 = '{value1!}';
dump(input13, option1);
const input14 = '{value1}!';
dump(input14, option1);

const option2 = {
  delimiter_open: '${',
  delimiter_close: '}',
};

const input20 = '${value2}';
dump(input20, option2);
const input21 = '!${value2}';
dump(input21, option2);
const input22 = '$!{value2}';
dump(input22, option2);
const input23 = '${!value2}';
dump(input23, option2);
const input24 = '${value2!}';
dump(input24, option2);
const input25 = '${value2}!';
dump(input25, option2);

const option3 = {
  delimiter_open: '{{',
  delimiter_close: '}}',
};

const input30 = '{{value3}}';
dump(input30, option3);
const input31 = '!{{value3}}';
dump(input31, option3);
const input32 = '{!{value3}}';
dump(input32, option3);
const input33 = '{{!value3}}';
dump(input33, option3);
const input34 = '{{value3!}}';
dump(input34, option3);
const input35 = '{{value3}!}';
dump(input35, option3);
const input36 = '{{value3}}!';
dump(input36, option3);
