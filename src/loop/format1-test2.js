const parser = require('./format1');
const Evaluator = require('./evaluator');
const Scope = require('./scope');

const dump = (input, scope) => {
  const parsed = parser.parse(input);
  console.log(JSON.stringify(parsed, null, 2));

  const evaluator = new Evaluator();
  evaluator.evaluate(parsed, scope);
};

const scope1 = new Scope();
scope1.addVariable('items', ['a', 'b', 'c']);
const input1 = `
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
