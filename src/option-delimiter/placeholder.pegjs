{
  const delimiter_open = options.delimiter_open;
  const delimiter_close = options.delimiter_close;
}

start
  = placeholder

placeholder
  = _ delim_open:delim_open _ v:variable _ delim_close:delim_close
  {
    return [delim_open, v, delim_close];
  }

delim_open
  = w:$([^ a-z0-9]i+)
    &{ return w === delimiter_open; }
  {
    return w;
  }

delim_close
  = w:$([^ a-z0-9]i+)
    &{ return w === delimiter_close; }
  {
    return w;
  }

variable
  = $[0-9a-z]i+

_ 'space'
  = [ \t]*
