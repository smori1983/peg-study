const parser = require('./format1');

const dump = (input) => {
  console.log(JSON.stringify(parser.parse(input.trim()), null, 2));
};

const input1 = `
for(item in items) {
  log(item)
}
`;

dump(input1);

const input2 = `
for(b in a) {
  for(c in b) {
    log(c)
  }
}
`;

dump(input2);
