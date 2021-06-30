start
  = v:variable m:method*
  {
    return {
      variable: v,
      methods: m,
    };
  }

variable
  = head:[a-z] tail:[0-9a-z_]*
  {
    return {
      text: head + tail.join(''),
    };
  }

method
  = _ '.' _ m:method_name _ '(' _ args:arguments* _ ')'
  {
    return {
      method: m,
      args: args.length > 0 ? args[0] : [],
    };
  }

method_name
  = head:[a-z] tail:[0-9a-z_]*
  {
    return {
      text: head + tail.join(''),
    };
  }

arguments
  = head:argument tail:(_ ',' _ p:argument { return p; })*
  {
    return [head].concat(tail);
  }

argument
  = arg_bool
  / arg_int
  / arg_string_single_quote
  / arg_string_double_quote

arg_bool
  = w:('true' / 'false')
  {
    return {
      type: 'bool',
      text: w,
    };
  }

arg_int
  = digits:[0-9]+
  {
    return {
      type: 'int',
      text: digits.join(''),
    };
  }

single_quote
  = "'"

arg_string_single_quote
  = single_quote chars:arg_string_single_quote_char* single_quote
  {
    return {
      type: 'string',
      text: chars.join(''),
    };
  }

arg_string_single_quote_char
  = !single_quote w:.
  {
    return w;
  }

double_quote
  = '"'

arg_string_double_quote
  = double_quote chars:arg_string_double_quote_char* double_quote
  {
    return {
      type: 'string',
      text: chars.join(''),
    };
  }

arg_string_double_quote_char
  = !double_quote w:.
  {
    return w;
  }

_ 'whitespace'
  = [ \t\r\n]*

__ 'space'
  = [ \t]*

