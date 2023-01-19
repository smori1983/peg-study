module.exports = [
  {
    input: 'if (true) { log("a") }',
    variables: {},
    output: [
      'a',
    ],
  },
  {
    input: `
      if (item.value > 100) {
        log('1')
      } else {
        log('2')
      }
    `,
    variables: {
      item: {
        value: 100,
      },
    },
    output: [
      '2',
    ],
  },
  {
    input: `
      if (a >= 10 && b >= 20) {
        if (c < 30) {
          log('1')
        } elseif (c == 30) {
          log('2')
        } else {
          log('3')
        }
      } else {
        log('4')
      }
    `,
    variables: {
      a: 10,
      b: 20,
      c: 30,
    },
    output: [
      '2',
    ],
  },
];
