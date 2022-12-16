/**
 * @type {string[][]}
 */
module.exports = [
  ['1', '(1)'],
  ['(((1)))', '(1)'],
  ['a', '(a)'],
  ['(((a)))', '(a)'],

  ['1 + 2', '(+ 1 2)'],
  ['1 + 2 + 3', '(+ (+ 1 2) 3)'],
  ['a + b', '(+ a b)'],
  ['a + 9', '(+ a 9)'],
  ['a + b + c', '(+ (+ a b) c)'],
  ['a + 7 + c', '(+ (+ a 7) c)'],

  ['1 - 2', '(- 1 2)'],
  ['1 - 2 - 3', '(- (- 1 2) 3)'],
  ['a1 - a2', '(- a1 a2)'],
  ['a1 - a2 - a3', '(- (- a1 a2) a3)'],
  ['a1 - 3', '(- a1 3)'],
  ['10 - a2 - a3', '(- (- 10 a2) a3)'],

  ['1 - 2 + 3 - 4', '(- (+ (- 1 2) 3) 4)'],
  ['a - b + c - d', '(- (+ (- a b) c) d)'],
  ['a - 7 + 8 - d', '(- (+ (- a 7) 8) d)'],

  ['3 * 4', '(* 3 4)'],
  ['3 * 4 * 5', '(* (* 3 4) 5)'],
  ['value1 * value2', '(* value1 value2)'],
  ['value1 * value2 * value3', '(* (* value1 value2) value3)'],
  ['value1 * 99', '(* value1 99)'],
  ['value1 * 10 * value3', '(* (* value1 10) value3)'],

  ['3 / 4', '(/ 3 4)'],
  ['3 / 4 / 5', '(/ (/ 3 4) 5)'],
  ['a / b', '(/ a b)'],
  ['a / b / c', '(/ (/ a b) c)'],
  ['1 / b', '(/ 1 b)'],
  ['1 / b / c', '(/ (/ 1 b) c)'],

  ['1 / 2 * 3', '(* (/ 1 2) 3)'],
  ['a1 / b1 * c1', '(* (/ a1 b1) c1)'],
  ['a1 / b1 * 100', '(* (/ a1 b1) 100)'],

  ['1 * 2 + 3', '(+ (* 1 2) 3)'],
  ['(1 + 2) * 3', '(* (+ 1 2) 3)'],
  ['value1 * value2 + value3', '(+ (* value1 value2) value3)'],
  ['(value1 + value2) * value3', '(* (+ value1 value2) value3)'],
  ['value1 * 2 + value3', '(+ (* value1 2) value3)'],
  ['(value1 + 10) * value3', '(* (+ value1 10) value3)'],

  ['(1 + 2) * (3 - 5)', '(* (+ 1 2) (- 3 5))'],
  ['(1 * (2 + 3)) - 4 / (5)', '(- (* 1 (+ 2 3)) (/ 4 5))'],
  ['(1 + a1) * (3 - a2)', '(* (+ 1 a1) (- 3 a2))'],
  ['(1 * (2 + value1)) - value2 / (5)', '(- (* 1 (+ 2 value1)) (/ value2 5))'],
];
