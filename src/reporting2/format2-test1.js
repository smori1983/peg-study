const parser = require('./format2');

const dump = (input, options) => {
  console.log(JSON.stringify(parser.parse(input.trim(), options), null, 2));
};

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
  bracket_open: '(',
  bracket_close: ')',
};

dump(input1, options1);

const input2 = `
report {
  code {
    100
  }
  output {
    "#[name]: #[amount]"
  }
}
report {
  code {
    200
  }
  output {
    '#[name] = #[amount]'
  }
}
`;

const options2 = {
  placeholder_mark: '#',
  bracket_open: '[',
  bracket_close: ']',
};

dump(input2, options2);
