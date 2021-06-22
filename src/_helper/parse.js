const ErrorReporter = require('../error/error-reporter');

/**
 * @param {PEG.Parser} parser
 */
const prepare = (parser) => {
  return {
    /**
     * @param {string} input
     * @param {Object} [options]
     */
    dump: (input, options) => {
      const text = input.trim();

      try {
        console.log(text);
        console.log(JSON.stringify(parser.parse(text, options || {}), null, 2));
      } catch (e) {
        const reporter = new ErrorReporter(text, e);
        console.log(reporter.getOriginalMessage());
        console.log(reporter.getCodeAsPlainText());
      }
    },
  };
};

module.exports = prepare;
