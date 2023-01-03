{
  const op_placeholder_mark = options.placeholder_mark;
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
  = char1:. char2:.
    &{ return char1 === op_placeholder_mark && char2 === op_placeholder_bracket_open; }
  {
    return char1 + char2;
  }

placeholder_bracket_close
  = char:.
    &{ return char === op_placeholder_bracket_close; }
  {
    return char;
  }

variable
  = $([a-z] [0-9a-z_]*)

_ 'space'
  = [ \t]*
