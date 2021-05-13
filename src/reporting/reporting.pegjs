start
  = report

report
  = _ 'report' _ '{' newline
    codes:code_block
    _ '}' newline* {
      return {
        code: codes,
      };
    }

code_block
  = _ 'code' _ '{' newline
    codes:code_block_line+
    _ '}' newline {
      return codes;
    }

code_block_line
  = _ c:code newline {
    return c;
  }

code
  = $([0-9]+)

_ 'whitespace'
  = [ \t\r\n]*

newline
  = [\r\n]+
