const parser = require('./format2');

const dump = (input) => {
  console.log(JSON.stringify(parser.parse(input.trim()), null, 2));
};

const input1 = `
log(data.upper().lower())
for(part in data.split('-')) {
  log(part.upper())
}
`;

dump(input1);
