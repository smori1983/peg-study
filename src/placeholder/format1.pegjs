{
  const delimiter_open = options.delimiter_open;
  const delimiter_close = options.delimiter_close;
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

delim_open
  = w:delim_available
    &{ return w === delimiter_open; }
  {
    return w;
  }

delim_close
  = w:delim_available
    &{ return w === delimiter_close; }
  {
    return w;
  }

delim_available 'delim_available'
  = $([^ a-z0-9]i+)

variable
  = head:[a-z] tail:[0-9a-z_]+
  {
    return head + tail.join('');
  }

_ 'space'
  = [ \t]*
