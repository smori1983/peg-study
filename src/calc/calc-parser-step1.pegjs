start
  = additive

additive
  = multiplicative _ additive_operator _ additive
  / multiplicative

additive_operator
  = char:[+\-]
  {
    return {
      type: 'plain',
      value: char,
    };
  }

multiplicative
  = operand _ multiplicative_operator _ multiplicative
  / primary

multiplicative_operator
  = char:[*/]
  {
    return {
      type: 'plain',
      value: char,
    };
  }

primary
  = operand
  / bracket_open _ additive _ bracket_close

operand
  = integer
  / placeholder

integer "integer"
  = digits:[0-9]+
  {
    return {
      type: 'plain',
      value: digits.join(''),
    };
  }

placeholder
  = '$' variable_initial:[a-z] variable_remaining:[_0-9a-z]*
  {
    return {
      type: 'placeholder',
      value: variable_initial + variable_remaining.join(''),
    };
  }

bracket_open
  = char:'('
  {
    return {
      type: 'plain',
      value: char,
    };
  }

bracket_close
  = char:')'
  {
    return {
      type: 'plain',
      value: char,
    };
  }

_ 'whitespace'
  = [ \t\n\r]*
  {
    return {
      type: 'plain',
      value: '',
    };
  }
