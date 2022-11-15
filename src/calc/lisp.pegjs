{
  function format(left, op, right) {
    return {
      text: op,
      children: [left, right],
    };
  }
  function makeInteger(o) {
    return parseInt(o.join(''), 10);
  }
}

start
  = set

set
  = '(' _ term:integer _ ')'
  {
    return term;
  }
  / '(' _ op:operator _ left:(integer/set) _ right:(integer/set) ')'
  {
    return format(left, op, right);
  }

operator
  = [+\-*/]

integer
  = digits:[0-9]+
  {
    return format(null, makeInteger(digits), null);
  }

_
  = [ \t\n\r]*
