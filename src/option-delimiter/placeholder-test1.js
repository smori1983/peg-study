const parser = require('./placeholder');

const input1 = '{foo}';

const option1 = {
  delimiter_open: '{',
  delimiter_close: '}',
};

console.log(parser.parse(input1.trim(), option1));

const input2 = '${bar}';

const option2 = {
  delimiter_open: '${',
  delimiter_close: '}',
};

console.log(parser.parse(input2.trim(), option2));
