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

output_line
  = _ single_quote t:(item_code / item_name / item_amount / value_string_single_quote)* single_quote _ newline
  {
    return {
      type: 'builtin',
      text: 'output_line',
      children: t,
    };
  }
  / _ double_quote t:(item_code / item_name / item_amount / value_string_double_quote)* double_quote _ newline
  {
    return {
      type: 'builtin',
      text: 'output_line',
      children: t,
    };
  }

item_code
  = placeholder_mark bracket_open _ 'code' _ bracket_close
  {
    return {
      type: 'variable',
      text: 'code',
    };
  }

item_name
  = placeholder_mark bracket_open _ 'name' _ bracket_close
  {
    return {
      type: 'variable',
      text: 'name',
    };
  }

item_amount
  = placeholder_mark bracket_open _ 'amount' _ bracket_close
  {
    return {
      type: 'variable',
      text: 'amount',
    };
  }

placeholder_mark
  = char:.
    &{ return char === op_placeholder_mark; }
  {
    return char;
  }

bracket_open
  = char:.
    &{ return char === op_bracket_open; }
  {
    return char;
  }

bracket_close
  = char:.
    &{ return char === op_bracket_close; }
  {
    return char;
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

newline
  = [\r\n]+
