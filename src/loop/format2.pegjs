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
  = c:component*
  {
    return toNode('root', 'root', {}, c);
  }

component
  = builtin_log
  / builtin_for_loop

builtin_log
  = _ 'log' _ '(' _ v:variable_and_method _ ')' _
  {
    return toNode('builtin', 'log', {arguments: [v]}, []);
  }

builtin_for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable_and_method _ ')' _ '{' _
    c:component*
    _ '}' _
  {
    return toNode('builtin', 'loop', {array: a, variable: v}, c);
  }

variable
  = v:$([a-z] [0-9a-z_]*)
  {
    return toNode('variable', v, {}, []);
  }

variable_and_method
  = v:variable m:method_or_property*
  {
    return toNode('variable', v.text, {methods: m}, []);
  }

method_or_property
  = _ '.' _ m:$([a-z] [0-9a-z_]*) _ '(' _ args:method_args* _ ')'
  {
    return toNode('method', m, {arguments: args.length > 0 ? args[0] : []}, []);
  }
  / _ '.' _ p:$(head:[a-z] tail:[0-9a-z_]*)
  {
    return toNode('property', p, {}, []);
  }

method_args
  = head:method_arg tail:(_ ',' _ p:method_arg { return p; })*
  {
    return [head].concat(tail);
  }

method_arg
  = method_arg_bool
  / method_arg_int
  / method_arg_string_single_quote
  / method_arg_string_double_quote
  / variable_and_method

method_arg_bool
  = w:('true' / 'false')
  {
    return toNode('bool', w, {}, []);
  }

method_arg_int
  = digits:$([0-9]+)
  {
    return toNode('int', digits, {}, []);
  }

single_quote
  = "'"

method_arg_string_single_quote
  = single_quote chars:$(method_arg_string_single_quote_char*) single_quote
  {
    return toNode('string', chars, {}, []);
  }

method_arg_string_single_quote_char
  = !single_quote w:.
  {
    return w;
  }

double_quote
  = '"'

method_arg_string_double_quote
  = double_quote chars:$(method_arg_string_double_quote_char*) double_quote
  {
    return toNode('string', chars, {}, []);
  }

method_arg_string_double_quote_char
  = !double_quote w:.
  {
    return w;
  }

_ 'whitespace'
  = [ \t\r\n]*

__ 'space'
  = [ \t]+
