const parser = require('./format2');
const helper = require('../_helper/parse')(parser);

const input1 = `
log(data1.name.upper().lower())
for(part in data2.split(split_text.lower())) {
  log(part.upper())
}
`;
helper.dump(input1);
