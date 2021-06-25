const parser = require('./format2');
const DebugBase = require('../loop/debug-base');

class Format2Debug extends DebugBase {
  constructor() {
    super(parser);
  }
}

module.exports = Format2Debug;
