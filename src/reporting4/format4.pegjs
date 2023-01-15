{
  const op_placeholder_mark = options.placeholder_mark;
  const op_placeholder_bracket_open = options.placeholder_bracket_open;
  const op_placeholder_bracket_close = options.placeholder_bracket_close;

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
  = report+

report
  = _ 'report' _ '{' _ newline
    code:block_code
    output:block_output
    _ '}' _ newline*
  {
    return toNode('block', 'report', {code: code, output: output}, []);
  }

block_code
  = _ 'code' _ '{' _ newline
    codes:block_code_line+
    _ '}' _ newline
  {
    return toNode('block', 'code', {}, codes);
  }

block_code_line
  = _ c:$([0-9]+) _ newline
  {
    return toNode('string', c, {}, []);
  }

block_output
  = _ 'output' _ '{' _ newline
    outputs:block_output_element+
    _ '}' _ newline
  {
    return toNode('block', 'output', {}, outputs);
  }

block_output_element
  = for_loop
  / output_line

for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable_chain _ ')' _ '{' _ newline
    children:block_output_element+
    _ '}' _ newline
  {
    return toNode('builtin', 'loop', {array: a, variable: v}, children);
  }

output_line
  = _ single_quote c:(variable_output / variable_output_fallback / value_string_single_quote)* single_quote _ newline
  {
    return toNode('builtin', 'output_line', {}, c);
  }
  / _ double_quote c:(variable_output / variable_output_fallback / value_string_double_quote)* double_quote _ newline
  {
    return toNode('builtin', 'output_line', {}, c);
  }

variable_output
  = placeholder_mark placeholder_bracket_open _ v:variable_chain _ placeholder_bracket_close
  {
    return v;
  }

variable
  = text:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return toNode('variable', text, {}, []);
  }

variable_chain
  = v:$([a-zA-Z][0-9a-zA-Z_]*) chain:(property_chain)?
  {
    return toNode('variable', v, {}, chain ? [chain] : []);
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

placeholder_mark
  = char:.
    &{ return char === op_placeholder_mark; }
  {
    return char;
  }

placeholder_bracket_open
  = char:.
    &{ return char === op_placeholder_bracket_open; }
  {
    return char;
  }

placeholder_bracket_close
  = char:.
    &{ return char === op_placeholder_bracket_close; }
  {
    return char;
  }

variable_output_fallback
  = char1:placeholder_mark &placeholder_mark
  {
    return toNode('string', char1, {}, []);
  }
  / char1:placeholder_mark &single_quote
  {
    return toNode('string', char1, {}, []);
  }
  / char1:placeholder_mark &double_quote
  {
    return toNode('string', char1, {}, []);
  }
  / char1:placeholder_mark !placeholder_bracket_open char2:.
  {
    return toNode('string', char1 + char2, {}, []);
  }

value_string_single_quote
  = text:$(value_string_single_quote_char+)
  {
    return toNode('string', text, {}, []);
  }

value_string_single_quote_char
  = !single_quote !placeholder_mark char:[^\r\n]
  {
    return char;
  }

value_string_double_quote
  = text:$(value_string_double_quote_char+)
  {
    return toNode('string', text, {}, []);
  }

value_string_double_quote_char
  = !double_quote !placeholder_mark char:[^\r\n]
  {
    return char;
  }

single_quote
  = "'"

double_quote
  = '"'

_
  = [ \t]*

__
  = [ \t]+

newline
  = [\r\n]+
