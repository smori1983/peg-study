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
  = variable

variable
  = v:$([a-zA-Z][0-9a-zA-Z_]*) m:method*
  {
    return toNode('variable', v, {}, m);
  }

method
  = _ '.' _ m:$([a-z][0-9a-z_]*) _ '(' _ args:arguments* _ ')'
  {
    return toNode('method', m, {arguments: args.length > 0 ? args[0] : []}, []);
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
