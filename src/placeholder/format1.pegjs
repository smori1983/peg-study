{
  const op_delimiter_open = options.delimiter_open;
  const op_delimiter_close = options.delimiter_close;

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
  = p:placeholder
  {
    return toNode('line_text', 'line_text', {}, [p]);
  }

placeholder
  = delimiter_open _ v:variable _ delimiter_close
  {
    return toNode('variable', v, {}, []);
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
