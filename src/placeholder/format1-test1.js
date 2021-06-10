const parser = require('./format1');

/**
 * @param {string} text
 * @param {Object} option
 */
const dump = (text, option) => {
  console.log(parser.parse(text.trim(), option));
}

const input1 = '{value1}';
const option1 = {
  delimiter_open: '{',
  delimiter_close: '}',
};

dump(input1, option1);

const input2 = '${value2}';
const option2 = {
  delimiter_open: '${',
  delimiter_close: '}',
};

dump(input2, option2);

const input3 = '{{value2}}';
const option3 = {
  delimiter_open: '{{',
  delimiter_close: '}}',
};

dump(input3, option3);

const input4 = '[value3]';
const option4 = {
  delimiter_open: '[',
  delimiter_close: ']',
};

dump(input4, option4);
