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
  = b:builtin*
  {
    return toNode('root', 'root', {}, b);
  }

builtin
  = builtin_log
  / builtin_for_loop

builtin_log
  = _ 'log' _ '(' _ v:variable_chain _ ')' _
  {
    return toNode('builtin', 'log', {arguments: [v]}, []);
  }

builtin_for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable_chain _ ')' _ '{' _
    children:builtin*
    _ '}' _
  {
    return toNode('builtin', 'loop', {array: a, variable: v}, children);
  }

variable
  = v:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return toNode('variable', v, {}, []);
  }

variable_chain
  = v:$([a-zA-Z][0-9a-zA-Z_]*) chain:(method_or_property)?
  {
    return toNode('variable', v, {}, chain ? [chain] : []);
  }

method_or_property
  = mp:(method / property) chain:(method_or_property)?
  {
    mp.children = chain ? [chain] : [];
    return mp;
  }

method
  = _ '.' _ m:$([a-zA-Z][0-9a-zA-Z_]*) _ '(' _ args:arguments* _ ')'
  {
    return toNode('method', m, {arguments: args.length > 0 ? args[0] : []}, []);
  }

property
  = _ '.' _ p:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return toNode('property', p, {}, []);
  }

arguments
  = head:argument tail:(_ ',' _ p:argument { return p; })*
  {
    return [head].concat(tail);
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
  = single_quote text:$(value_string_single_quote_char*) single_quote
  {
    return toNode('string', text, {}, []);
  }

value_string_single_quote_char
  = !single_quote char:.
  {
    return char;
  }

value_string_double_quote
  = double_quote text:$(value_string_double_quote_char*) double_quote
  {
    return toNode('string', text, {}, []);
  }

value_string_double_quote_char
  = !double_quote char:.
  {
    return char;
  }

single_quote
  = "'"

double_quote
  = '"'

_
  = [ \t\r\n]*

__
  = [ \t]+
