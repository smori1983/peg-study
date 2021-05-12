{
  function makeInteger(o) {
    return parseInt(o.join(''), 10);
  }
}

start
  = additive

additive
  = left:multiplicative _ '+' _ right:additive { return left + right; }
  / left:multiplicative _ '-' _ right:additive { return left - right; }
  / multiplicative

multiplicative
  = left:primary _ '*' _ right:multiplicative { return left * right; }
  / left:primary _ '/' _ right:multiplicative { return left / right; }
  / primary

primary
  = operand
  / '(' _ additive:additive _ ')' { return additive; }

operand
  = integer

integer "integer"
  = digits:[0-9]+ { return makeInteger(digits); }

_ "whitespace"
  = [ \t\n\r]*
