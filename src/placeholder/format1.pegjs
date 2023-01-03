{
  const op_placeholder_bracket_open = options.placeholder_bracket_open;
  const op_placeholder_bracket_close = options.placeholder_bracket_close;

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
  = placeholder_bracket_open _ v:variable _ placeholder_bracket_close
  {
    return toNode('variable', v, {}, []);
  }

placeholder_bracket_open
  = w:placeholder_bracket_available
    &{ return w === op_placeholder_bracket_open; }
  {
    return w;
  }

placeholder_bracket_close
  = w:placeholder_bracket_available
    &{ return w === op_placeholder_bracket_close; }
  {
    return w;
  }

placeholder_bracket_available 'placeholder_bracket_available'
  = $([^ a-z0-9]i+)

variable
  = $([a-z] [0-9a-z_]*)

_ 'space'
  = [ \t]*
