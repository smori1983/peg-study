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
  = variable_chain;

variable_chain
  = v:variable chain:(method_chain / property_chain)?
  {
    v.children = chain ? [chain] : [];
    return v;
  }

variable
  = text:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return toNode('variable', text, {}, []);
  }

method_chain
  = m:method chain:(method_chain / property_chain)?
  {
    m.children = chain ? [chain] : [];
    return m;
  }

property_chain
  = p:property chain:(method_chain / property_chain)?
  {
    p.children = chain ? [chain] : [];
    return p;
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

method_or_property
  = method
  / p:property+
  {
    return p.reduce((result, property) => {
      result.children.push(property);
    });
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
