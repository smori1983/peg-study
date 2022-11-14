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
  = add

add
  = left:multi _ op:[+\-] _ right:add
  {
    return format(left, op, right);
  }
  / multi

multi
  = left:primary _ op:[*/] _ right:multi
  {
    return format(left, op, right);
  }
  / primary

primary
  = i:integer
  {
    return format(null, i, null);
  }
  / '(' _ a:add _ ')'
  {
    return a;
  }

integer
  = digits:[0-9]+
  {
    return makeInteger(digits);
  }

_
  = [ \t\n\r]*
