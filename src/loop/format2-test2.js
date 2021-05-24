const parser = require('./format2');
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
scope1.addVariable('data', 'a-b-c');
const input1 = `
log(data.upper().lower())
for(part in data.split('-')) {
  log(part.upper())
}
`;

dump(input1, scope1);
