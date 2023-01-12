{
  const op_placeholder_mark = '#';
  const op_placeholder_bracket_open = '{';
  const op_placeholder_bracket_close = '}';
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
  = placeholder_mark placeholder_bracket_open _ 'code' _ placeholder_bracket_close
  {
    return {
      type: 'variable',
      text: 'code',
    };
  }

item_name
  = placeholder_mark placeholder_bracket_open _ 'name' _ placeholder_bracket_close
  {
    return {
      type: 'variable',
      text: 'name',
    };
  }

item_amount
  = placeholder_mark placeholder_bracket_open _ 'amount' _ placeholder_bracket_close
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
