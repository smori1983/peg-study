const parser = require('./format1');
const Builder = require('./builder');
const Output = require('./output');
const Scope = require('./scope');

const dump = (input, scope) => {
  const parsed = parser.parse(input);

  const builder = new Builder();
  const root = builder.build(parsed);
  const output = new Output();

  root.evaluate(scope, output);
  console.log(output.getLines().join('\n'));
};

const scope1 = new Scope();
scope1.addVariable('items', ['a', 'b', 'c']);
const input1 = `
log(items)
for(item in items) {
  log(item)
}
`;

dump(input1, scope1);

const scope2 = new Scope();
scope2.addVariable('a', [['x'], ['y'], ['z']]);
const input2 = `
for(b in a) {
  for(c in b) {
    log(c)
  }
}
`;

dump(input2, scope2);
