const parser = require('./format3');
const helper = require('../_helper/parse')(parser);

const options = {
  placeholder_mark: '#',
  bracket_open: '{',
  bracket_close: '}',
};

const input1 = '#{value}';
helper.dump(input1, options);

const input2 = 'hello, #{value}';
helper.dump(input2, options);

const input3 = 'hello, ##{value}';
helper.dump(input3, options);

const input4 = 'hello, # #{value}';
helper.dump(input4, options);

const input5 = 'hello, # {value}';
helper.dump(input5, options);

const input6 = '#hello, #{value}';
helper.dump(input6, options);

const input7 = 'hello, #{value} #';
helper.dump(input7, options);

const input8 = '#[test] #{value}';
helper.dump(input8, options);

const input9 = '#{value1} #{value2}';
helper.dump(input9, options);
