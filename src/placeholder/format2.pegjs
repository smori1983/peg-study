{
  const op_placeholder_mark = options.placeholder_mark;
  const op_bracket_open = options.bracket_open;
  const op_bracket_close = options.bracket_close;

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
  = bracket_open _ v:variable _ bracket_close
  {
    return toNode('variable', v, {}, []);
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

variable
  = $([a-z] [0-9a-z_]*)

_ 'space'
  = [ \t]*
