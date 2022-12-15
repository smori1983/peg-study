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
  = head:multi tail:(_ ('+' / '-') _ multi)*
  {
    return tail.reduce(function(result, element) {
      return format('add', element[1], result, element[3]);
    }, head);
  }

multi
  = head:primary tail:(_ ('*' / '/') _ primary)*
  {
    return tail.reduce(function(result, element) {
      return format('multi', element[1], result, element[3]);
    }, head);
  }

primary
  = '(' _ a:add _ ')'
  {
    return a;
  }
  / i:integer
  {
    return format('number', i, null, null);
  }
  / v:variable
  {
    return format('variable', v, null, null);
  }

integer
  = digits:[0-9]+
  {
    return makeInteger(digits);
  }

variable
  = chars:$([a-zA-Z][a-zA-Z0-9]*)
  {
    return chars;
  }
_
  = [ \t\n\r]*
