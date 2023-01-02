{
  const op_delimiter_open = options.delimiter_open;
  const op_delimiter_close = options.delimiter_close;
}

start
  = placeholder

placeholder
  = delimiter_open _ v:variable _ delimiter_close
  {
    return {
      type: 'variable',
      text: v,
    };
  }

delimiter_open
  = w:delimiter_available
    &{ return w === op_delimiter_open; }
  {
    return w;
  }

delimiter_close
  = w:delimiter_available
    &{ return w === op_delimiter_close; }
  {
    return w;
  }

delimiter_available 'delimiter_available'
  = $([^ a-z0-9]i+)

variable
  = $([a-z] [0-9a-z_]*)

_ 'space'
  = [ \t]*
