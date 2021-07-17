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

    if (search === replace) {
      return new Value(value);
    }

    let result = value;

    while (result.indexOf(search) >= 0) {
      result = result.replace(search, replace);
    }

    return new Value(result);
  }
}

module.exports = MethodDefReplace;
