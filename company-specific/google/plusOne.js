/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  const reversedDigits = digits.reverse();
  let remainder = 1;
  const result = [];
  for (const digit of reversedDigits) {
    const val = digit + remainder;
    result.push(val % 10);
    remainder = Math.floor(val / 10);
  }
  if (remainder > 0) {
    result.push(remainder);
  }
  return result.reverse();
};
