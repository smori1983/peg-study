const parser = require('./format3');

const dump = (input, options) => {
  console.log(JSON.stringify(parser.parse(input.trim(), options), null, 2));
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

const options1 = {
  placeholder_mark: '#',
  bracket_open: '{',
  bracket_close: '}',
};

dump(input1, options1);
