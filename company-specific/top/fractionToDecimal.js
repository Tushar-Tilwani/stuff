/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function (numerator, denominator) {
  const result = [];
  if (numerator * denominator < 0) {
    result.push("-");
  }
  numerator = Math.abs(numerator);
  denominator = Math.abs(denominator);
  let remainder = numerator % denominator;
  let divisor = Math.floor(numerator / denominator);
  result.push(divisor);
  if (remainder === 0) {
    return result.join("");
  }
  result.push(".");

  const indexMap = new Map();
  while (remainder !== 0) {
    if (indexMap.has(remainder)) {
      const index = indexMap.get(remainder);
      result.splice(index, 0, "(");
      result.push(")");
      return result.join("");
    }
    indexMap.set(remainder, result.length);
    remainder = remainder * 10;
    divisor = Math.floor(remainder / denominator);
    result.push(divisor);
    remainder = remainder % denominator;
  }

  return result.join("");
};
