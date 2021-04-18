start
  = additive

additive
  = operand _ operator _ operand

operator
  = char:'+' {
    return {
      type: 'plain',
      value: char,
    };
  }

operand
  = integer
  / placeholder

integer "integer"
  = digits:[0-9]+ {
    return {
      type: 'plain',
      value: digits.join(''),
    };
  }

placeholder
  = "$" variable:[a-z]+ {
    return {
      type: 'placeholder',
      value: variable.join(''),
    };
  }

_ "whitespace"
  = [ \t\n\r]* {
    return {
      type: 'plain',
      value: '',
    };
  }
