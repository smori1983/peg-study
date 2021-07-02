{
  const op_placeholder_mark = options.placeholder_mark;
  const op_bracket_open = options.bracket_open;
  const op_bracket_close = options.bracket_close;
}

start
  = report+

report
  = _ 'report' _ '{' _ newline
    codes:code_block
    outputs:output_block
    _ '}' _ newline*
  {
    return {
      code: codes,
      output: outputs,
    };
  }

code_block
  = _ 'code' _ '{' _ newline
    codes:code_block_line+
    _ '}' _ newline
  {
    return codes;
  }

code_block_line
  = _ c:code _ newline
  {
    return c;
  }

code
  = $([0-9]+)

output_block
  = _ 'output' _ '{' _ newline
    outputs:output_block_element+
    _ '}' _ newline
  {
    return outputs;
  }

output_block_element
  = output_line
  / for_loop

output_line
  = _ single_quote t:(variable_output / variable_output_fallback / text_single_quote)* single_quote _ newline
  {
    return {
      type: 'builtin',
      text: 'output_line',
      children: t,
    };
  }
  / _ double_quote t:(variable_output / variable_output_fallback / text_double_quote)* double_quote _ newline
  {
    return {
      type: 'builtin',
      text: 'output_line',
      children: t,
    };
  }

for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable _ ')' _ '{' _ newline
    children:output_block_element+
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
  = placeholder_mark bracket_open _ v:variable _ bracket_close
  {
    return v;
  }

variable
  = head:[a-z] tail:[0-9a-z_]*
  {
    return {
      type: 'variable',
      text: head + tail.join(''),
    };
  }

placeholder_mark
  = w:.
    &{ return w === op_placeholder_mark; }
  {
    return w;
  }

bracket_open
  = w:.
    &{ return w === op_bracket_open; }
  {
    return w;
  }

bracket_close
  = w:.
    &{ return w === op_bracket_close; }
  {
    return w;
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
  / char1:placeholder_mark !bracket_open char2:.
  {
    return {
      type: 'plain_fallback',
      text: char1 + char2,
    };
  }

single_quote
  = "'"

text_single_quote
  = chars:text_single_quote_char+
  {
    return {
      type: 'plain',
      text: chars.join(''),
    };
  }

text_single_quote_char
  = !single_quote !placeholder_mark char:[^\r\n]
  {
    return char;
  }

double_quote
  = '"'

text_double_quote
  = chars:text_double_quote_char+
  {
    return {
      type: 'plain',
      text: chars.join(''),
    };
  }

text_double_quote_char
  = !double_quote !placeholder_mark char:[^\r\n]
  {
    return char;
  }

_
  = [ \t]*

__
  = [ \t]+

newline
  = [\r\n]+
