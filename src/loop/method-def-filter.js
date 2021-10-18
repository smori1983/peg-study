const MethodDef = require('./method-def');
const Value = require('./value');

class MethodDefFilter extends MethodDef {
  getReceiverType() {
    return 'array';
  }

  getName() {
    return 'filter';
  }

  getArgTypes() {
    return ['string', 'number'];
  }

  getReturnType() {
    return 'array';
  }

  evaluate(receiver, args) {
    /**
     * @type {*[]}
     */
    const value = receiver.getValue();

    /**
     * @type {string}
     */
    const operator = args[0].getValue();

    /**
     * @type {*}
     */
    const operand = args[1].getValue();

    if (operator === '>') {
      return new Value(value.filter((current) => {
        return current > operand;
      }));
    }

    if (operator === '>=') {
      return new Value(value.filter((current) => {
        return current >= operand;
      }));
    }

    if (operator === '<') {
      return new Value(value.filter((current) => {
        return current < operand;
      }));
    }

    if (operator === '<=') {
      return new Value(value.filter((current) => {
        return current <= operand;
      }));
    }

    throw new Error('Unknown operator: ' + operator);
  }
}

module.exports = MethodDefFilter
