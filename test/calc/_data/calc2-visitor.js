/**
 * @type {string[][]}
 */
module.exports.buAdd0 = [
  ['1 + 0', '1'],
  ['0 + 1', '1'],
  ['1 - 0', '1'],
  ['0 - 1', '0 - 1'],
  ['(3 + 0) * (0 + 4)', '3 * 4'],
  ['(0 + 0) / (0 + 0)', '0 / 0'],
  ['(1 + 0) / (0 + 0)', '1 / 0'],
  ['1 * (1 * 0)', '1 * (1 * 0)'],

  ['a + 0', 'a'],
  ['0 + a', 'a'],
  ['a - 0', 'a'],
  ['0 - a', '0 - a'],
  ['(a + 0) * (0 + b)', 'a * b'],
  ['(0 + 0) / (0 + 0)', '0 / 0'],
  ['(a + 0) / (0 + 0)', 'a / 0'],
  ['a * (b * 0)', 'a * (b * 0)'],
];

/**
 * @type {string[][]}
 */
module.exports.buMulti0 = [
  ['1 + 0', '1 + 0'],
  ['0 + 1', '0 + 1'],
  ['(3 + 0) * (0 + 4)', '(3 + 0) * (0 + 4)'],
  ['(0 + 0) / (0 + 0)', '(0 + 0) / (0 + 0)'],
  ['(1 + 0) / (0 + 0)', '(1 + 0) / (0 + 0)'],
  ['1 * (1 * 0)', '0'],
  ['1 * 0 + 2 * 0', '0 + 0'],
  ['0 / 9', '0'],

  ['a + 0', 'a + 0'],
  ['0 + a', '0 + a'],
  ['(a + 0) * (0 + b)', '(a + 0) * (0 + b)'],
  ['(0 + 0) / (0 + 0)', '(0 + 0) / (0 + 0)'],
  ['(a + 0) / (0 + 0)', '(a + 0) / (0 + 0)'],
  ['a * (b * 0)', '0'],
  ['a * 0 + b * 0', '0 + 0'],
  ['0 / a', '0 / a'],
];

/**
 * @type {string[][]}
 */
module.exports.buMulti1 = [
  ['1 + 0', '1 + 0'],
  ['0 + 1', '0 + 1'],
  ['(3 + 0) * (0 + 4)', '(3 + 0) * (0 + 4)'],
  ['(0 + 0) / (0 + 0)', '(0 + 0) / (0 + 0)'],
  ['(1 + 0) / (0 + 0)', '(1 + 0) / (0 + 0)'],
  ['1 * (1 * 0)', '0'],
  ['1 * 0 + 2 * 0', '0 + 2 * 0'],
  ['3 * 1', '3'],
  ['(3 - 5) * 1', '3 - 5'],
  ['(7 + 8) / 1', '7 + 8'],

  ['a + 0', 'a + 0'],
  ['0 + b', '0 + b'],
  ['(a + 0) * (0 + b)', '(a + 0) * (0 + b)'],
  ['(0 + 0) / (0 + 0)', '(0 + 0) / (0 + 0)'],
  ['(c + 0) / (0 + 0)', '(c + 0) / (0 + 0)'],
  ['a * (b * 0)', 'a * (b * 0)'],
  ['a * 0 + b * 0', 'a * 0 + b * 0'],
  ['a * 1', 'a'],
  ['(a - b) * 1', 'a - b'],
  ['(a + b) / 1', 'a + b'],
];

/**
 * @type {string[][]}
 */
module.exports.combination = [
  ['1 + 0', '1'],
  ['0 + 1', '1'],
  ['(3 + 0) * (0 + 4)', '3 * 4'],
  ['(0 + 0) / (0 + 0)', '0 / 0'],
  ['(0 + 0) / (3 + 0)', '0'],
  ['(0 + 0) / (9 * 1)', '0'],
  ['(1 + 0) / (0 + 0)', '1 / 0'],
  ['1 * (1 * 0)', '0'],
  ['1 * 0 + 2 * 0', '0'],
  ['3 * 1', '3'],
  ['(3 - 5) * 1', '3 - 5'],
  ['(7 + 8) / 1', '7 + 8'],

  ['a + 0', 'a'],
  ['0 + a', 'a'],
  ['(a + 0) * (0 + b)', 'a * b'],
  ['(0 + 0) / (0 + 0)', '0 / 0'],
  ['(0 + 0) / (a + 0)', '0 / a'],
  ['(0 + 0) / (a * 1)', '0 / a'],
  ['(a + 0) / (0 + 0)', 'a / 0'],
  ['a * (b * 0)', '0'],
  ['a * 0 + b * 0', '0'],
  ['a * 1', 'a'],
  ['(a - b) * 1', 'a - b'],
  ['(a + b) / 1', 'a + b'],
];

/**
 * @type {string[][]}
 */
module.exports.tdFactorize = [
  ['2 * 3 + 4 * 2', '2 * (3 + 4)'],
  ['2 * 3 + (2 * 3) * (5 * 2)', '(2 * 3) * (1 + 5 * 2)'],
  ['(7 + 9) * (1 + 2) + (3 + 4) * (9 + 7)', '(7 + 9) * ((1 + 2) + (3 + 4))'],
  ['(3 + 4) * 8 * 5 + (4 + 3) * 5 * 9', '5 * (3 + 4) * (8 + 9)'],
  ['(1 / 2) * 3 + 4 * (1 / 2)', '(1 / 2) * (3 + 4)'],

  // Unsupported expressions
  ['3 * 9 + 9 * 4 * 3', '3 * (9 + 9 * 4)'],
  ['7 + (3 + 4) * 7', '7 + (3 + 4) * 7'],
  ['(1 / 2) * 3 - 4 * (1 / 2)', '(1 / 2) * 3 - 4 * (1 / 2)'],

  ['a * b + c * a', 'a * (b + c)'],
  ['a * b + (a * b) * (c * d)', '(a * b) * (1 + c * d)'],
  ['(a + b) * (c + d) + (e + f) * (b + a)', '(a + b) * ((c + d) + (e + f))'],
  ['(a + b) * d * c + (b + a) * c * e', 'c * (a + b) * (d + e)'],
  ['(a / b) * c + d * (a / b)', '(a / b) * (c + d)'],

  // Unsupported expressions
  ['a * b + b * c * a', 'a * (b + b * c)'],
  ['a + (b + c) * a', 'a + (b + c) * a'],
  ['(a / b) * c - d * (a / b)', '(a / b) * c - d * (a / b)'],
];
