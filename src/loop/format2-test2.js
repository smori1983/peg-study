const parser = require('./format2');
const Debug = require('./format2-debug');
const Scope = require('./scope');

const dump = (input, scope) => {
  console.log(new Debug().get(input, scope).getContent());
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
