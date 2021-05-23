const parser = require('./format1');
const Builder = require('./builder');
const Scope = require('./scope');

const dump = (input, scope) => {
  const parsed = parser.parse(input);
  console.log(JSON.stringify(parsed, null, 2));

  const builder = new Builder();
  const root = builder.build(parsed);

  root.evaluate(scope);
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
