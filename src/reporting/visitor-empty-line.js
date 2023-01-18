const Visitor = require('./visitor');

class VisitorEmptyLine extends Visitor {
  supports(node) {
    return node.type === 'empty_line';
  }

  visit(node, scope, output, processor) {
    // Noop.
  }
}

module.exports = VisitorEmptyLine;
