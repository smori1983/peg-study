const parser = require('./format2');

const dump = (input) => {
  console.log(JSON.stringify(parser.parse(input.trim()), null, 2));
};

const input1 = `
log(data1.name.upper().lower())
for(part in data2.split(split_text.lower())) {
  log(part.upper())
}
`;

dump(input1);
