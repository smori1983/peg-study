const parser = require('./format3');
const helper = require('../_helper/parse')(parser);

const options = {
  placeholder_mark: '#',
  placeholder_bracket_open: '{',
  placeholder_bracket_close: '}',
};

const input1 = `
report {
  code {
    100
  }
  output {
    "[#{code}]"
    "#{name}: #{amount}"
    for (comment in comments) {
      "- #{comment}"
    }
  }
}
`;
helper.dump(input1, options);
