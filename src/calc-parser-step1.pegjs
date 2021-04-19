start
  = additive

additive
  = operand _ additive_operator _ operand

additive_operator
  = char:'+' {
    return {
      type: 'plain',
      value: char,
    };
  }
  / char:'-' {
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
