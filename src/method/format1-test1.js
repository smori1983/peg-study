const parser = require('./format1');

const input1 = 'code';

console.log(JSON.stringify(parser.parse(input1.trim()), null, 2));

const input2 = 'code.lower()';

console.log(JSON.stringify(parser.parse(input2.trim()), null, 2));

const input3 = 'code.lower().upper()';

console.log(JSON.stringify(parser.parse(input3.trim()), null, 2));

const input4 = 'code.foo(1)';

console.log(JSON.stringify(parser.parse(input4.trim()), null, 2));

const input5 = 'code.foo(100, 2, 3)';

console.log(JSON.stringify(parser.parse(input5.trim()), null, 2));

const input6 = 'code.foo(1, "x", \'_\')';

console.log(JSON.stringify(parser.parse(input6.trim()), null, 2));

const input7 = 'code.foo(true).bar(false)';

console.log(JSON.stringify(parser.parse(input7.trim()), null, 2));
