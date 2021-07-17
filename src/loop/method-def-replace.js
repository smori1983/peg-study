const MethodDef = require('./method-def');
const Value = require('./value');

class MethodDefReplace extends MethodDef {
  getReceiverType() {
    return 'string';
  }

  getName() {
    return 'replace';
  }

  getArgTypes() {
    return ['string', 'string'];
  }

  getReturnType() {
    return 'string';
  }

  evaluate(receiver, args) {
    /**
     * @type {string}
     */
    const value = receiver.getValue();

    /**
     * @type {string}
     */
    const search = args[0].getValue();

    /**
     * @type {string}
     */
    const replace = args[1].getValue();

    if (search.length === 0) {
      return new Value(value);
    }

    const result = value.split(search).join(replace);

    return new Value(result);
  }
}

module.exports = MethodDefReplace;
