start
  = components:component*
  {
    return {
      type: 'root',
      text: 'root',
      children: components,
    };
  }

component
  = for_loop
  / log

for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable_and_method _ ')' _ '{' _
    components:component*
    _ '}' _
  {
    return {
      type: 'builtin',
      text: 'for',
      array: a,
      variable: v,
      children: components,
    };
  }

variable
  = head:[a-z] tail:[0-9a-z_]*
  {
    return {
      type: 'variable',
      text: head + tail.join(''),
    };
  }

variable_and_method
  = v:variable m:method_or_property*
  {
    return {
      type: 'variable',
      text: v.text,
      methods: m,
    };
  }

method_or_property
  = _ '.' _ head:[a-z] tail:[0-9a-z_]* _ '(' _ args:method_args* _ ')'
  {
    return {
      type: 'method',
      text: head + tail.join(''),
      args: args.length > 0 ? args[0] : [],
    };
  }
  / _ '.' _ head:[a-z] tail:[0-9a-z_]*
  {
    return {
      type: 'property',
      text: head + tail.join(''),
    };
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
    return {
      type: 'bool',
      text: w,
    };
  }

method_arg_int
  = digits:[0-9]+
  {
    return {
      type: 'int',
      text: digits.join(''),
    };
  }

single_quote
  = "'"

method_arg_string_single_quote
  = single_quote chars:method_arg_string_single_quote_char* single_quote
  {
    return {
      type: 'string',
      text: chars.join(''),
    };
  }

method_arg_string_single_quote_char
  = !single_quote w:.
  {
    return w;
  }

double_quote
  = '"'

method_arg_string_double_quote
  = double_quote chars:method_arg_string_double_quote_char* double_quote
  {
    return {
      type: 'string',
      text: chars.join(''),
    };
  }

method_arg_string_double_quote_char
  = !double_quote w:.
  {
    return w;
  }

log
  = _ 'log' _ '(' _ v:variable_and_method _ ')' _
  {
    return {
      type: 'builtin',
      text: 'log',
      args: [v],
    };
  }

_ 'whitespace'
  = [ \t\r\n]*

__ 'space'
  = [ \t]+
