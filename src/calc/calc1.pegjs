{
  function toNode(type, text, attributes, children) {
    return {
      type: type,
      text: text,
      attributes: attributes,
      children: children,
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
    return tail.reduce(function(result, elements) {
      return toNode('add', elements[1], {}, [result, elements[3]]);
    }, head);
  }

multi
  = head:primary tail:(_ ('*' / '/') _ primary)*
  {
    return tail.reduce(function(result, elements) {
      return toNode('multi', elements[1], {}, [result, elements[3]]);
    }, head);
  }

primary
  = '(' _ a:add _ ')'
  {
    return a;
  }
  / i:integer
  {
    return toNode('number', i, {}, []);
  }

integer
  = digits:[0-9]+
  {
    return makeInteger(digits);
  }

_
  = [ \t\n\r]*
