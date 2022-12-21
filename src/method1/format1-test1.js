const parser = require('./format1');
const helper = require('../_helper/parse')(parser);

const input1 = 'code';
helper.dump(input1);

const input2 = 'code.lower()';
helper.dump(input2);

const input3 = 'code.lower().upper()';
helper.dump(input3);

const input4 = 'code.foo(1)';
helper.dump(input4);

const input5 = 'code.foo(100, 2, 3)';
helper.dump(input5);

const input6 = 'code.foo(1, "x", \'_\')';
helper.dump(input6);

const input7 = 'code.foo(true).bar(false)';
helper.dump(input7);
