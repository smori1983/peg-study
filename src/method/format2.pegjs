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
  = variable_chain

variable_chain
  = v:$([a-zA-Z][0-9a-zA-Z_]*) mp:method_or_property*
  {
    return toNode('variable', v, {}, mp);
  }

method_or_property
  = method
  / property

method
  = _ '.' _ m:$([a-zA-Z][0-9a-zA-Z_]*) _ '(' _ args:arguments* _ ')'
  {
    return toNode('method', m, {arguments: (args.length > 0) ? args[0] : []}, []);
  }

property
  = _ '.' _ p:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return toNode('property', p, {}, []);
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
  = !double_quote w:.
  {
    return char;
  }

single_quote
  = "'"

double_quote
  = '"'

_
  = [ \t\r\n]*
