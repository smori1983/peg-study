const parser = require('./format2');
const helper = require('../_helper/parse')(parser);

const options1 = {
  placeholder_mark: '#',
  bracket_open: '(',
  bracket_close: ')',
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
helper.dump(input1, options1);

const options2 = {
  placeholder_mark: '#',
  bracket_open: '[',
  bracket_close: ']',
};

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
helper.dump(input2, options2);
