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
  = b:builtin*
  {
    return toNode('root', 'root', {}, b);
  }

builtin
  = builtin_log
  / builtin_for_loop

builtin_log
  = _ 'log' _ '(' _ v:variable _ ')' _
  {
    return toNode('builtin', 'log', {argument: v}, []);
  }

builtin_for_loop
  = _ 'for' _ '(' _ v:variable __ 'in' __ a:variable _ ')' _ '{' _
    children:builtin*
    _ '}' _
  {
    return toNode('builtin', 'loop', {array: a, variable: v}, children);
  }

variable
  = v:$([a-zA-Z][0-9a-zA-Z_]*)
  {
    return toNode('variable', v, {}, []);
  }

_
  = [ \t\r\n]*

__ 'space'
  = [ \t]+
