module.exports = [
  {
    items: [
      ['100', 'item01', 100, ['xxx', 'yyy']],
      ['200', 'item02', 200, ['zzz']],
    ],
    input: [
      'report {',
      '  code {',
      '    100',
      '    200',
      '  }',
      '  output {',
      '    "# code:#{code} {#{name},#{amount}}"',
      '    for (comment in comments) {',
      '      "- #{comment}"',
      '    }',
      '  }',
      '}',
    ],
    output: [
      '# code:100 {item01,100}',
      '- xxx',
      '- yyy',
      '# code:200 {item02,200}',
      '- zzz',
    ],
  },
  {
    items: [
      ['100', 'item01', 100],
      ['200', 'item02', 200],
    ],
    input: [
      'report {',
      '  code {',
      '    100',
      '    200',
      '  }',
      '  output {',
      '    "- ##{amount}#"', // double quote
      "    '- ##{amount}#'", // single quote
      '  }',
      '}',
    ],
    output: [
      '- #100#',
      '- #100#',
      '- #200#',
      '- #200#',
    ],
  }
];
