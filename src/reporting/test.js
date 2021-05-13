const parser = require('./reporting');
const input = `
report {
  code {
    100
    200
    300
  }
}
`.trim();

console.log(JSON.stringify(parser.parse(input), null, 2));
