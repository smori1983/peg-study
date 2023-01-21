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
  / integer
  / variable

integer
  = text:$('-'? [0-9]+)
  {
    return toNode('number', text, {}, []);
  }

variable
  = text:$([a-zA-Z][a-zA-Z0-9]*) p:(property_chain*)
  {
    return toNode('variable', text, {}, p);
  }

property_chain
  = p:property chain:(property_chain?)
  {
    p.children = chain ? [chain] : [];
    return p;
  }

property
   = _ '.' _ text:$([a-zA-Z][0-9a-zA-Z_]*)
   {
     return toNode('property', text, {}, []);
   }

_
  = [ \t\n\r]*
