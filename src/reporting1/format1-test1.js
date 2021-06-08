const parser = require('./format1');

const dump = (input) => {
  console.log(JSON.stringify(parser.parse(input.trim()), null, 2));
};

const input1 = `
report {
  code {
    100
    200
    300
  }
  output {
    "[$code]"
    "name: $name"
    "amount: $amount"
  }
}
`;

dump(input1);

const input2 = `
report {
  code {
    100
  }
  output {
    "$name: $amount"
  }
}
report {
  code {
    200
  }
  output {
    '$name($code): $amount'
  }
}
`;

dump(input2);
