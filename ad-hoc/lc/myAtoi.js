/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
  const val = parseInt(str.trim()) || 0;
  const SIGN32 = Math.pow(2, 31);
  const MIN_VAL = -SIGN32;
  const MAX_VAL = SIGN32 - 1;

  if (val < MIN_VAL) {
    return MIN_VAL;
  }

  if (val > MAX_VAL) {
    return MAX_VAL;
  }

  return val;
};
