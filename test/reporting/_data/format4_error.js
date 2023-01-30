module.exports = [
  {
    input: [
      '',
    ],
  },
  {
    input: [
      'report {',
      '  code {',
      '  }',
      '  output {',
      '    if (1 > 1 == 1) {',
      '    }',
      '  }',
      '}',
    ],
  },
  {
    input: [
      'report {',
      '  code {',
      '  }',
      '  output {',
      '    if (1 == 1 == 1) {',
      '    }',
      '  }',
      '}',
    ],
  },
];
