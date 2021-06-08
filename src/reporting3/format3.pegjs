{
  const placeholder_mark = options.placeholder_mark;
  const bracket_open = options.bracket_open;
  const bracket_close = options.bracket_close;
}

start
  = report+

report 'report'
  = _ 'report' _ '{' newline
    codes:code_block
    outputs:output_block
    _ '}' newline*
  {
    return {
      code: codes,
      output: outputs,
    };
  }

code_block 'code_block'
  = _ 'code' _ '{' newline
    codes:code_block_line+
    _ '}' newline
  {
    return codes;
  }

code_block_line 'code_block_line'
  = _ c:code _ newline
  {
    return c;
  }

code 'code'
  = $([0-9]+)

output_block 'output_block'
  = _ 'output' _ '{' newline
    outputs:output_block_element+
    _ '}' newline
  {
    return outputs;
  }

output_block_element 'output_block_element'
  = output_line
  / for_loop

output_line 'output_line'
  = _ "'" t:(variable_output / text_single_quote)* "'" _ newline
  {
    return {
      type: 'builtin',
      text: 'output',
      children: t,
    };
  }
  / _ '"' t:(variable_output / text_double_quote)* '"' _ newline
  {
    return {
      type: 'builtin',
      text: 'output',
      children: t,
    };
  }

for_loop 'for_loop'
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

variable_output 'variable_output'
  = placeholder_open bracket_open _ v:variable _ bracket_close
  {
    return v;
  }

variable 'variable'
  = head:[a-z] tail:[0-9a-z_]*
  {
    return {
      type: 'variable',
      text: head + tail.join(''),
    };
  }

placeholder_open 'placeholder_open'
  = w:.
    &{ return w === placeholder_mark; }
  {
    return w;
  }

bracket_open 'bracket_open'
  = w:.
    &{ return w === bracket_open; }
  {
    return w;
  }

bracket_close 'bracket_close'
  = w:.
    &{ return w === bracket_close; }
  {
    return w;
  }

text_single_quote 'text_single_quote'
  = chars:text_single_quote_char+
  {
    return {
      type: 'plain',
      text: chars.join(''),
    };
  }

text_single_quote_char 'text_single_quote_char'
  = char:[^\r\n']
    &{ return char !== placeholder_mark; }
  {
    return char;
  }

text_double_quote 'text_double_quote'
  = chars:text_double_quote_char+
  {
    return {
      type: 'plain',
      text: chars.join(''),
    };
  }

text_double_quote_char 'text_double_quote_char'
  = char:[^\r\n"]
    &{ return char !== placeholder_mark; }
  {
    return char;
  }

_ 'whitespace'
  = [ \t]*

__ 'space'
  = [ \t]+

newline 'newline'
  = [\r\n]+
