{
  function format(type, op, left, right) {
    return {
      type: type,
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
    return format('add', op, left, right);
  }
  / multi

multi
  = left:primary _ op:[*/] _ right:multi
  {
    return format('multi', op, left, right);
  }
  / primary

primary
  = i:integer
  {
    return format('number', i, null, null);
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
