const MethodDef = require('./method-def');
const Value = require('./value');

class MethodDefSort extends MethodDef {
  getReceiverType() {
    return 'array';
  }

  getName() {
    return 'sort';
  }

  getArgTypes() {
    return [];
  }

  getReturnType() {
    return 'array';
  }

  evaluate(receiver, args) {
    /**
     * @type {*[]}
     */
    const array = receiver.getValue();

    array.sort();

    return new Value(array);
  }
}

module.exports = MethodDefSort;
