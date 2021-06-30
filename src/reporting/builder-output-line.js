const NodeOutputLine = require('./node-output-line');
const Value = require('./value');
const Variable = require('./variable');

class BuilderOutputLine {
  supports(ast) {
    return ast.type === 'builtin' && ast.text === 'output_line';
  }

  build(parentNode, ast) {
    const outputLine = new NodeOutputLine();

    ast.children.forEach((child) => {
      if (child.type === 'plain' || child.type === 'plain_fallback') {
        outputLine.addComponent(new Value(child.text));
      } else if (child.type === 'variable') {
        outputLine.addComponent(new Variable(child.text));
      }
    });

    parentNode.addChild(outputLine);
  }
}
