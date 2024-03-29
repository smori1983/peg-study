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
    empty_line*
    code:block_code
    empty_line*
    output:block_output
    empty_line*
    _ '}' _ newline*
  {
    return toNode('block', 'report', {code: code, output: output}, []);
  }

block_code
  = _ 'code' _ '{' _ newline
    children:block_code_element*
    _ '}' _ newline
  {
    return toNode('block', 'code', {}, children);
  }

block_code_element
  = block_code_line
  / empty_line

block_code_line
  = _ c:$([0-9]+) _ newline
  {
    return toNode('string', c, {}, []);
  }

block_output
  = _ 'output' _ '{' _ newline
    outputs:block_output_element*
    _ '}' _ newline
  {
    return toNode('block', 'output', {}, outputs);
  }

block_output_element
  = for_loop
  / condition
  / output_line
  / empty_line

for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable_chain _ ')' _ '{' _ newline?
    children:block_output_element*
    _ '}' _ newline?
  {
    return toNode('builtin', 'loop', {array: a, variable: v}, children);
  }

condition 'condition'
  = c_if:condition_if c_elseif:condition_elseif* c_else:condition_else*
  {
    return toNode('condition', 'condition', {}, [c_if].concat(c_elseif).concat(c_else));
  }

condition_if 'if'
  = _ 'if' _ '(' _ c:condition_logical_or _ ')' _ '{' _ newline?
    children:block_output_element*
    _ '}' _ newline?
  {
    return toNode('condition', 'if', {condition: c}, children);
  }

condition_elseif 'elseif'
  = _ 'elseif' _ '(' _ c:condition_logical_or _ ')' _ '{' _ newline?
    children:block_output_element*
    _ '}' _ newline?
  {
    return toNode('condition', 'elseif', {condition: c}, children);
  }

condition_else 'else'
  = _ 'else' _ '{' _ newline?
    children:block_output_element*
    _ '}' _ newline?
  {
    return toNode('condition', 'else', {}, children);
  }

condition_logical_or 'logical_or'
  = head:condition_logical_and tail:(_ ('||' / 'or') _ condition_logical_and)*
  {
    return tail.reduce((result, elements) => {
      return toNode('logical', elements[1], {}, [result, elements[3]]);
    }, head);
  }

condition_logical_and 'logical_and'
  = head:condition_comparative tail:(_ ('&&' / 'and') _ condition_comparative)*
  {
    return tail.reduce((result, elements) => {
      return toNode('logical', elements[1], {}, [result, elements[3]]);
    }, head);
  }

condition_comparative 'comparative'
  = left:condition_comparative_primary _ op:('==' / '!=' / '>=' / '<=' / '>' / '<') _ right:condition_comparative_primary
  {
    return toNode('comparative', op, {}, [left, right]);
  }
  / condition_comparative_primary

condition_comparative_primary 'comparative_primary'
  = arithmetic_add
  / '(' _ l:condition_logical_or _ ')'
  {
    return l;
  }
  / value_bool
  / value_float
  / value_int
  / value_string_single_quote
  / value_string_double_quote
  / variable_chain

arithmetic_add 'add'
  = head:arithmetic_multi tail:(_ ('+' / '-') _ arithmetic_multi)*
  {
    return tail.reduce((result, elements) => {
      return toNode('add', elements[1], {}, [result, elements[3]]);
    }, head);
  }

arithmetic_multi 'multi'
  = head:arithmetic_primary tail:(_ ('*' / '/') _ arithmetic_primary)*
  {
    return tail.reduce((result, elements) => {
      return toNode('multi', elements[1], {}, [result, elements[3]]);
    }, head);
  }

arithmetic_primary 'arithmetic_primary'
  = '(' _ a:arithmetic_add _ ')'
  {
    return a;
  }
  / value_bool
  / value_float
  / value_int
  / variable_chain

output_line 'output_line'
  = _ single_quote c:(output_variable / output_string_single_quote / output_fallback)* single_quote _ newline
  {
    return toNode('builtin', 'output_line', {}, c);
  }
  / _ double_quote c:(output_variable / output_string_double_quote / output_fallback)* double_quote _ newline
  {
    return toNode('builtin', 'output_line', {}, c);
  }

output_variable
  = placeholder_mark placeholder_bracket_open _ v:variable_chain _ placeholder_bracket_close
  {
    return v;
  }

output_fallback
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
  / char1:placeholder_mark !placeholder_bracket_open !newline char2:.
  {
    return toNode('string', char1 + char2, {}, []);
  }

output_string_single_quote
  = text:$(output_string_single_quote_char+)
  {
    return toNode('string', text, {}, []);
  }

output_string_single_quote_char
  = !single_quote !placeholder_mark char:[^\r\n]
  {
    return char;
  }

output_string_double_quote
  = text:$(output_string_double_quote_char+)
  {
    return toNode('string', text, {}, []);
  }

output_string_double_quote_char
  = !double_quote !placeholder_mark char:[^\r\n]
  {
    return char;
  }

variable 'variable'
  = text:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return toNode('variable', text, {}, []);
  }

variable_chain 'variable_chain'
  = v:$([a-zA-Z][0-9a-zA-Z_]*) chain:(property_chain?)
  {
    return toNode('variable', v, {}, chain ? [chain] : []);
  }

property_chain 'property_chain'
  = p:property chain:(property_chain?)
  {
    p.children = chain ? [chain] : [];
    return p;
  }

property 'property'
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

value_bool
  = text:('true' / 'false')
  {
    return toNode('bool', text, {}, []);
  }

value_float
  = text:$([0-9]+ '.' [0-9]+)
  {
    return toNode('float', text, {}, []);
  }

value_int
  = text:$([0-9]+)
  {
    return toNode('int', text, {}, []);
  }

value_string_single_quote
  = single_quote text:$(value_string_single_quote_char+) single_quote
  {
    return toNode('string', text, {}, []);
  }

value_string_single_quote_char
  = !single_quote !placeholder_mark char:[^\r\n]
  {
    return char;
  }

value_string_double_quote
  = double_quote text:$(value_string_double_quote_char+) double_quote
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

empty_line
  = _ newline
  {
    return toNode('empty_line', 'empty_line', {}, []);
  }

_
  = [ \t]*

__
  = [ \t]+

newline
  = [\r\n]+
