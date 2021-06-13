{
  const placeholder_mark = options.placeholder_mark;
  const bracket_open = options.bracket_open;
  const bracket_close = options.bracket_close;
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

output_line
  = _ "'" t:(item_code / item_name / item_amount / text_single_quote)* "'" _ newline
  {
    return {
      type: 'builtin',
      text: 'output_line',
      children: t,
    };
  }
  / _ '"' t:(item_code / item_name / item_amount / text_double_quote)* '"' _ newline
  {
    return {
      type: 'builtin',
      text: 'output_line',
      children: t,
    };
  }

item_code
  = placeholder_open bracket_open _ 'code' _ bracket_close
  {
    return {
      type: 'variable',
      text: 'code',
    };
  }

item_name
  = placeholder_open bracket_open _ 'name' _ bracket_close
  {
    return {
      type: 'variable',
      text: 'name',
    };
  }

item_amount
  = placeholder_open bracket_open _ 'amount' _ bracket_close
  {
    return {
      type: 'variable',
      text: 'amount',
    };
  }

placeholder_open
  = w:.
    &{ return w === placeholder_mark; }
  {
    return w;
  }

bracket_open
  = w:.
    &{ return w === bracket_open; }
  {
    return w;
  }

bracket_close
  = w:.
    &{ return w === bracket_close; }
  {
    return w;
  }

text_single_quote
  = chars:text_single_quote_char+
  {
    return {
      type: 'plain',
      text: chars.join(''),
    };
  }

text_single_quote_char
  = char:[^\r\n']
    &{ return char !== placeholder_mark; }
  {
    return char;
  }

text_double_quote
  = chars:text_double_quote_char+
  {
    return {
      type: 'plain',
      text: chars.join(''),
    };
  }

text_double_quote_char
  = char:[^\r\n"]
    &{ return char !== placeholder_mark; }
  {
    return char;
  }

_
  = [ \t]*

newline
  = [\r\n]+
