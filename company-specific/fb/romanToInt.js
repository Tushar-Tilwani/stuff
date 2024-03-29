const MAP = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const nextChar = s[i + 1];
    const currentVal = MAP[char] ?? 0;
    const nextVal = MAP[nextChar] ?? 0;

    if (currentVal < nextVal) {
      result += nextVal - currentVal;
      i++;
      continue;
    }
    result += currentVal;
  }
  return result;
};
