/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const chars = s.split("");
  const uniqueSet = new Set();
  const allSet = new Set();
  for (const char of chars) {
    if (allSet.has(char)) {
      uniqueSet.delete(char);
    } else {
      uniqueSet.add(char);
    }
    allSet.add(char);
  }

  for (let i = 0; i < chars.length; i++) {
    if (uniqueSet.has(chars[i])) {
      return i;
    }
  }

  return -1;
};
