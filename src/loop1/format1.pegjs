start
  = codes:code*
  {
    return {
      type: 'root',
      text: 'root',
      children: codes,
    };
  }

code
  = for_loop
  / log

for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable _ ')' _ '{' _
    codes:code*
    _ '}' _
  {
    return {
      type: 'builtin',
      text: 'for',
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

log
  = _ 'log' _ '(' _ v:variable _ ')' _
  {
    return {
      type: 'builtin',
      text: 'log',
      variable: v,
    };
  }

_ 'whitespace'
  = [ \t\r\n]*

__ 'space'
  = [ \t]+
