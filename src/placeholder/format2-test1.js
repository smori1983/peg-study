const parser = require('./format2');
const helper = require('../_helper/parse')(parser);

const options = {
  placeholder_mark: '#',
  bracket_open: '{',
  bracket_close: '}',
};

const input1 = '#{value1}';
helper.dump(input1, options);

const input2 = '${value1}';
helper.dump(input2, options);

const input3 = '#[value1]';
helper.dump(input3, options);

const input4 = '#{!value1}';
helper.dump(input4, options);
