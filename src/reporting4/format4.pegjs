{
  const op_placeholder_mark = options.placeholder_mark;
  const op_placeholder_bracket_open = options.placeholder_bracket_open;
  const op_placeholder_bracket_close = options.placeholder_bracket_close;
}

start
  = report+

report
  = _ 'report' _ '{' _ newline
    codes:block_code
    outputs:block_output
    _ '}' _ newline*
  {
    return {
      code: codes,
      output: outputs,
    };
  }

block_code
  = _ 'code' _ '{' _ newline
    codes:block_code_line+
    _ '}' _ newline
  {
    return codes;
  }

block_code_line
  = _ c:code _ newline
  {
    return c;
  }

code
  = $([0-9]+)

block_output
  = _ 'output' _ '{' _ newline
    outputs:block_output_element+
    _ '}' _ newline
  {
    return outputs;
  }

block_output_element
  = output_line
  / for_loop

output_line
  = _ single_quote t:(variable_output / variable_output_fallback / value_string_single_quote)* single_quote _ newline
  {
    return {
      type: 'builtin',
      text: 'output_line',
      children: t,
    };
  }
  / _ double_quote t:(variable_output / variable_output_fallback / value_string_double_quote)* double_quote _ newline
  {
    return {
      type: 'builtin',
      text: 'output_line',
      children: t,
    };
  }

for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable _ ')' _ '{' _ newline
    children:block_output_element+
    _ '}' _ newline
  {
    return {
      type: 'builtin',
      text: 'for_loop',
      array: a,
      variable: v,
      children: children,
    };
  }

variable_output
  = placeholder_mark placeholder_bracket_open _ v:variable _ placeholder_bracket_close
  {
    return v;
  }

variable
  = text:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return {
      type: 'variable',
      text: text,
    };
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
    return {
      type: 'plain_fallback',
      text: char1,
    };
  }
  / char1:placeholder_mark &single_quote
  {
    return {
      type: 'plain_fallback',
      text: char1,
    };
  }
  / char1:placeholder_mark &double_quote
  {
    return {
      type: 'plain_fallback',
      text: char1,
    };
  }
  / char1:placeholder_mark !placeholder_bracket_open char2:.
  {
    return {
      type: 'plain_fallback',
      text: char1 + char2,
    };
  }

value_string_single_quote
  = text:$(value_string_single_quote_char+)
  {
    return {
      type: 'plain',
      text: text,
    };
  }

value_string_single_quote_char
  = !single_quote !placeholder_mark char:[^\r\n]
  {
    return char;
  }

value_string_double_quote
  = text:$(value_string_double_quote_char+)
  {
    return {
      type: 'plain',
      text: text,
    };
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
