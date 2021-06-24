const parser = require('./format4');
const ReporterBase = require('../reporting/reporter-base');

class Format4Reporter extends ReporterBase {
  constructor() {
    super(parser, {
      placeholder_mark: '#',
      bracket_open: '{',
      bracket_close: '}',
    });
  }
}

module.exports = Format4Reporter;
