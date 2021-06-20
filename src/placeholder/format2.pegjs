{
  const op_placeholder_mark = options.placeholder_mark;
  const op_bracket_open = options.bracket_open;
  const op_bracket_close = options.bracket_close;
}

start
  = placeholder

placeholder
  = bracket_open _ v:variable _ bracket_close
  {
    return v;
  }

variable
  = head:[a-z] tail:[0-9a-z_]*
  {
    return {
      type: 'variable',
      text: head + tail.join(''),
    };
  }

bracket_open
  = mark:. delim:.
    &{ return mark === op_placeholder_mark && delim === op_bracket_open; }
  {
    return mark + delim;
  }

bracket_close
  = delim:.
    &{ return delim === op_bracket_close; }
  {
    return delim;
  }

_ 'space'
  = [ \t]*
