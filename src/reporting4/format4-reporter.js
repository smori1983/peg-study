const parser = require('./format4');
const ReporterBase = require('../reporting/reporter-base');

class Format4Reporter extends ReporterBase {
  constructor() {
    super(parser, {
      placeholder_mark: '#',
      placeholder_bracket_open: '{',
      placeholder_bracket_close: '}',
    });
  }
}

module.exports = Format4Reporter;
