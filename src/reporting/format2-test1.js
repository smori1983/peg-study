const parser = require('./format2');

const input1 = `
report {
  code {
    100
  }
  output {
    "[#(code)]"
    "name: #(name)"
    "amount: #(amount)"
  }
}
`;

const options1 = {
  placeholder_mark: '#',
};

console.log(JSON.stringify(parser.parse(input1.trim(), options1), null, 2));

const input2 = `
report {
  code {
    100
  }
  output {
    "$(name): $(amount)"
  }
}
report {
  code {
    200
  }
  output {
    '$(name) = $(amount)'
  }
}
`;

const options2 = {
  placeholder_mark: '$',
};

console.log(JSON.stringify(parser.parse(input2.trim(), options2), null, 2));
