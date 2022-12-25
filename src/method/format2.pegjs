{
  function toNode(type, text, attributes, children) {
    return {
      type: type,
      text: text,
      attributes: attributes,
      children: children,
    };
  }
  function toBool(text) {
    return text === 'true';
  }
  function toInt(text) {
    return parseInt(text, 10);
  }
  function toFloat(text) {
    return parseFloat(text);
  }
}

start
  = v:variable mp:method_or_property*
  {
    return toNode('variable', v, {}, mp);
  }

variable
  = text:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return text;
  }

method_or_property
  = method
  / property

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
  / v:variable mp:method_or_property*
  {
    return toNode('variable', v, {}, mp);
  }
  / v:variable
  {
    return toNode('variable', v, {}, []);
  }

value_bool
  = text:('true' / 'false')
  {
    return toNode('bool', toBool(text), {}, []);
  }

value_float
  = text:$([0-9]+ '.' [0-9]+)
  {
    return toNode('float', toFloat(text), {}, []);
  }

value_int
  = text:$([0-9]+)
  {
    return toNode('int', toInt(text), {}, []);
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
