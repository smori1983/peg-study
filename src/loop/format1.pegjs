{
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
  = c:component*
  {
    return toNode('root', 'root', {}, c);
  }

component
  = builtin_log
  / builtin_for_loop

builtin_log
  = _ 'log' _ '(' _ v:variable _ ')' _
  {
    return toNode('builtin', 'log', {argument: v}, []);
  }

builtin_for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable _ ')' _ '{' _
    c:component*
    _ '}' _
  {
    return toNode('builtin', 'loop', {array: a, variable: v}, c);
  }

variable
  = v:$([a-z] [0-9a-z_]*)
  {
    return toNode('variable', v, {}, []);
  }

_ 'whitespace'
  = [ \t\r\n]*

__ 'space'
  = [ \t]+
