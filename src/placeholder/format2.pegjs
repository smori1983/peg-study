{
  const placeholder_mark = options.placeholder_mark;
  const bracket_open = options.bracket_open;
  const bracket_close = options.bracket_close;
}

start
  = placeholder

placeholder
  = _ delim_open _ v:variable _ delim_close
  {
    return {
      type: 'variable',
      text: v,
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

delim_open
  = mark:. delim:.
    &{ return mark === placeholder_mark && delim === bracket_open; }
  {
    return mark + delim;
  }

delim_close
  = delim:.
    &{ return delim === bracket_close; }
  {
    return delim;
  }

_ 'space'
  = [ \t]*
