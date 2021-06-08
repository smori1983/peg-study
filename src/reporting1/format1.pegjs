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
    outputs:output_block_line+
    _ '}' _ newline
  {
    return outputs;
  }

output_block_line
  = _ "'" t:(item_code / item_name / item_amount / text_single_quote)* "'" _ newline { return t; }
  / _ '"' t:(item_code / item_name / item_amount / text_double_quote)* '"' _ newline { return t; }

item_code
  = '$code'
  {
    return {
      type: 'variable',
      text: 'code',
    };
  }

item_name
  = '$name'
  {
    return {
      type: 'variable',
      text: 'name',
    };
  }

item_amount
  = '$amount'
  {
    return {
      type: 'variable',
      text: 'amount',
    };
  }

text_single_quote
  = t:[^\r\n'$]+
  {
    return {
      type: 'plain',
      text: t.join(''),
    };
  }

text_double_quote
  = t:[^\r\n"$]+
  {
    return {
      type: 'plain',
      text: t.join(''),
    };
  }

_ 'whitespace'
  = [ \t]*

newline
  = [\r\n]+
