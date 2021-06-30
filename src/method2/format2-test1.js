const parser = require('./format2');
const helper = require('../_helper/parse')(parser);

const input1 = 'code';
helper.dump(input1);

const input2 = 'code.foo().bar()';
helper.dump(input2);

const input3 = 'code.foo(100, "x", true)';
helper.dump(input3);
