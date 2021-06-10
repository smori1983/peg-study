const parser = require('./format1');

const input1 = '{value1}';

const option1 = {
  delimiter_open: '{',
  delimiter_close: '}',
};

console.log(parser.parse(input1.trim(), option1));

const input2 = '${value2}';

const option2 = {
  delimiter_open: '${',
  delimiter_close: '}',
};

console.log(parser.parse(input2.trim(), option2));

const input3 = '{{value2}}';

const option3 = {
  delimiter_open: '{{',
  delimiter_close: '}}',
};

console.log(parser.parse(input3.trim(), option3));

const input4 = '<value3>';

const option4 = {
  delimiter_open: '<',
  delimiter_close: '>',
};

console.log(parser.parse(input4.trim(), option4));
