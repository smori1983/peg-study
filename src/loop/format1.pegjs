start
  = for_loop

for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable _ ')' _ '{' _
    codes:code*
    _ '}' _
  {
    return {
      type: 'loop',
      array: a,
      variable: v,
      children: codes,
    };
  }

variable
  = head:[a-z] tail:[0-9a-z_]*
  {
    return {
      type: 'variable',
      text: head + tail.join(''),
    };
  }

code
  = for_loop
  / log

log
  = _ 'log' _ '(' _ v:variable _ ')' _
  {
    return {
      type: 'log',
      variable: v,
    };
  }

_ 'whitespace'
  = [ \t\r\n]*

__ 'space'
  = [ \t]+
