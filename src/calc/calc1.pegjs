{
  function toNode(type, text, attributes, children) {
    return {
      type: type,
      text: text,
      attributes: attributes,
      children: children,
    };
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
  = text:$([0-9]+)
  {
    return text;
  }

_
  = [ \t\n\r]*
