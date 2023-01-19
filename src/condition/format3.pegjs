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
  = (condition_block / log)*

log
  = _ 'log' _ '(' _ args:arguments* _ ')' _
  {
    return toNode('builtin', 'log', {arguments: (args.length > 0) ? args[0] : []}, []);
  }

condition_block
  = c_if:condition_if c_elseif:condition_elseif* c_else:condition_else*
  {
    return toNode('condition_block', 'condition', {}, [c_if].concat(c_elseif).concat(c_else));
  }

condition_if
  = _ 'if' _ '(' _ c:logical_or _ ')' _ '{' _
    children:(condition_block / log)*
    _ '}' _
  {
    return toNode('condition', 'if', {condition: c}, children);
  }

condition_elseif
  = _ 'elseif' _ '(' _ c:logical_or _ ')' _ '{' _
    children:(condition_block / log)*
    _ '}' _
  {
    return toNode('condition', 'elseif', {condition: c}, children);
  }

condition_else
  = _ 'else' _ '{' _
    children:(condition_block / log)*
    _ '}' _
  {
    return toNode('condition', 'else', {}, children);
  }

logical_or
  = head:logical_and tail:(_ ('||' / 'or') _ logical_and)*
  {
    return tail.reduce((result, elements) => {
      return toNode('logical', elements[1], {}, [result, elements[3]]);
    }, head);
  }

logical_and
  = head:comparative tail:(_ ('&&' / 'and') _ comparative)*
  {
    return tail.reduce((result, elements) => {
      return toNode('logical', elements[1], {}, [result, elements[3]]);
    }, head);
  }

comparative
  = left:add _ op:('==' / '!=' / '>=' / '<=' / '>' / '<') _ right:add
  {
    return toNode('comparative', op, {}, [left, right]);
  }
  / add

add
  = head:multi tail:(_ ('+' / '-') _ multi)*
  {
    return tail.reduce((result, elements) => {
      return toNode('add', elements[1], {}, [result, elements[3]]);
    }, head);
  }

multi
  = head:primary tail:(_ ('*' / '/') _ primary)*
  {
    return tail.reduce((result, elements) => {
      return toNode('multi', elements[1], {}, [result, elements[3]]);
    }, head);
  }

primary
  = '(' _ l:logical_or _ ')'
  {
    return l;
  }
  / value_bool
  / value_float
  / value_int
  / value_string_single_quote
  / value_string_double_quote
  / variable_chain

variable_chain
  = v:variable chain:(method_or_property)?
  {
    v.children = chain ? [chain] : [];
    return v;
  }

variable
  = text:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return toNode('variable', text, {}, []);
  }

method_or_property
  = mp:(method / property) chain:(method_or_property)?
  {
    mp.children = chain ? [chain] : [];
    return mp;
  }

method
  = _ '.' _ text:$([a-zA-Z][0-9a-zA-Z_]*) _ '(' _ args:arguments* _ ')'
  {
    return toNode('method', text, {arguments: (args.length > 0) ? args[0] : []}, []);
  }

property
  = _ '.' _ text:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return toNode('property', text, {}, []);
  }

arguments
  = head:argument tail:(_ ',' _ argument)*
  {
    return tail.reduce((result, elements) => {
      return result.concat(elements[3]);
    }, [head]);
  }

argument
  = value_bool
  / value_float
  / value_int
  / value_string_single_quote
  / value_string_double_quote
  / variable_chain

value_bool
  = text:('true' / 'false')
  {
    return toNode('bool', text, {}, []);
  }

value_float
  = text:$([0-9]+ '.' [0-9]+)
  {
    return toNode('float', text, {}, []);
  }

value_int
  = text:$([0-9]+)
  {
    return toNode('int', text, {}, []);
  }

value_string_single_quote
  = single_quote text:$(value_string_single_quote_chars*) single_quote
  {
    return toNode('string', text, {}, []);
  }

value_string_single_quote_chars
  = !single_quote w:.
  {
    return w;
  }

value_string_double_quote
  = double_quote text:$(value_string_double_quote_chars*) double_quote
  {
    return toNode('string', text, {}, []);
  }

value_string_double_quote_chars
  = !double_quote w:.
  {
    return w;
  }

single_quote
  = "'"

double_quote
  = '"'

_
  = [ \t\r\n]*

__
  = [ \t]+
