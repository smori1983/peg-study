const parser = require('./format2');

const dump = (input) => {
  console.log(JSON.stringify(parser.parse(input.trim()), null, 2));
};

const input1 = `
for(row in data) {
  log(row)
  for(code in row.split('-')) {
    log(code)
  }
}
`;

dump(input1);
