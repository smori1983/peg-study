{
  function makeInteger(o) {
    return parseInt(o.join(''), 10);
  }
}

start
  = additive

additive
  = left:operand _ '+' _ right:operand { return left + right; }

operand
  = integer

integer "integer"
  = digits:[0-9]+ { return makeInteger(digits); }

_ "whitespace"
  = [ \t\n\r]*
