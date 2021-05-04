// p.74 chap 4.3

start
  = line+

line
  = command:command newline* {
    return command;
  }

command
  = 'line from ' begin:point ' to ' end:point {
    return {
      begin: begin,
      end: end,
    };
  }

point
  = x:int ',' y:int {
    return {
      x: x,
      y: y,
    };
  }

int
  = digits:[0-9]+ {
    return parseInt(digits.join(''), 10);
  }

_ 'whitespace'
  = [ \t\r\n]*

newline
  = [\r\n]+
