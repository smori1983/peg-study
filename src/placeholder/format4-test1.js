const parser = require('./format4');
const helper = require('../_helper/parse')(parser);

const options = {
  placeholder_mark: '#',
  bracket_open: '{',
  bracket_close: '}',
};

const input1 = `
#[test] #
##{test} #{value} #
`;
helper.dump(input1, options);
