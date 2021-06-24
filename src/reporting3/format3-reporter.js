const parser = require('./format3');
const ReporterBase = require('../reporting/reporter-base');

class Format3Reporter extends ReporterBase {
  constructor() {
    super(parser, {
      placeholder_mark: '#',
      bracket_open: '{',
      bracket_close: '}',
    });
  }
}

module.exports = Format3Reporter;
