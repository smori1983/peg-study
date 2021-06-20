{
  const placeholder_mark = options.placeholder_mark;
  const bracket_open = options.bracket_open;
  const bracket_close = options.bracket_close;
}

start
  = component+

component
  = placeholder
  / placeholder_fallback_as_plain_text
  / plain_text

placeholder
  = _ delim_open _ v:variable _ delim_close
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

placeholder_fallback_as_plain_text
  //
  // When reached to EOF, char2 will be null.
  //
  = char1:. char2:.?
    &{ return char1 === placeholder_mark; }
    &{ return char2 !== bracket_open; }
  {
    return {
      type: 'plain_fallback',
      text: char1 + (char2 ? char2 : ''),
    };
  }

plain_text
  = chars:plain_text_char+
  {
    return {
      type: 'plain',
      text: chars.join(''),
    };
  }

plain_text_char
  = char:[^\r\n]
    &{ return char !== placeholder_mark; }
  {
    return char;
  }

_ 'space'
  = [ \t]*
