const parser = require('./reporting');

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

console.log(JSON.stringify(parser.parse(input1.trim()), null, 2));

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

console.log(JSON.stringify(parser.parse(input2.trim()), null, 2));
