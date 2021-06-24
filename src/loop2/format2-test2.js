const parser = require('./format2');
const Builder = require('./format2-builder');
const Output = require('../loop/output');
const Scope = require('../loop/scope');

const dump = (input, scope) => {
  const parsed = parser.parse(input);

  const builder = new Builder();
  const root = builder.build(parsed);
  const output = new Output();

  root.evaluate(scope, output);
  console.log(output.getLines().join('\n'));
};

const scope1 = new Scope();
scope1.addVariable('data1', {spec: {name: 'xyz'}});
scope1.addVariable('data2', 'a-b-c');
const input1 = `
log(data1.spec.name.upper().lower())
for(part in data2.split('-')) {
  log(part.upper())
}
`;

dump(input1, scope1);
