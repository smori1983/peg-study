const parser = require('./format1');
const helper = require('../_helper/parse')(parser);

const input1 = `
for(item in items) {
  log(item)
}
`;
helper.dump(input1);

const input2 = `
for(b in a) {
  for(c in b) {
    log(c)
  }
}
`;
helper.dump(input2);
