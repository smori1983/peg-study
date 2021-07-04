const parser = require('./format5');
const helper = require('../_helper/parse')(parser);

const options = {
  placeholder_mark: '#',
  bracket_open: '{',
  bracket_close: '}',
};

const input1 = `
report {
  code {
    100
  }
  output {
    "#{code}"
    for (comment in comments) {
      "#{comment}"
    }
  }
}
`;
helper.dump(input1, options);
