const parser = require('./graphics');

const input = `
line from 1,1 to 2,2
line from 10,0 to 0,10
line from 0,10 to 10,10
`;

console.log(parser.parse(input.trim()));
