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
  = line+

line
  = c:component+ newline*
  {
    return toNode('line_text', 'line_text', {}, c);
  }

component
  = placeholder
  / placeholder_fallback_as_plain_text1
  / placeholder_fallback_as_plain_text2
  / placeholder_fallback_as_plain_text3
  / plain_text

placeholder
  = placeholder_mark placeholder_bracket_open _ v:variable _ placeholder_bracket_close
  {
    return toNode('variable', v, {}, []);
  }

variable
  = $([a-z] [0-9a-z_]*)

placeholder_mark
  = char:.
    &{ return char === op_placeholder_mark; }
  {
    return char;
  }

placeholder_bracket_open
  = char:.
    &{ return char === op_placeholder_bracket_open; }
  {
    return char;
  }

placeholder_bracket_close
  = char:.
    &{ return char === op_placeholder_bracket_close; }
  {
    return char;
  }

placeholder_fallback_as_plain_text1
  = char:. &newline
    &{ return char === op_placeholder_mark; }
  {
    return toNode('plain_fallback', char, {}, []);
  }

placeholder_fallback_as_plain_text2
  = char:. &placeholder_mark
    &{ return char === op_placeholder_mark; }
  {
    return toNode('plain_fallback', char, {}, []);
  }

placeholder_fallback_as_plain_text3
  //
  // When reached to EOF, char2 will be null.
  //
  = char1:. char2:.?
    &{ return char1 === op_placeholder_mark; }
    &{ return char2 !== op_placeholder_bracket_open; }
  {
    return toNode('plain_fallback', char1 + (char2 ? char2 : ''), {}, []);
  }

plain_text
  = chars:$(plain_text_char+)
  {
    return toNode('plain', chars, {}, []);
  }

plain_text_char
  = char:[^\r\n]
    &{ return char !== op_placeholder_mark; }
  {
    return char;
  }

_ 'space'
  = [ \t]*

newline
  = [\r\n]+
