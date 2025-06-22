/**
 * @param {string} s
 * @return {boolean}
 */
const CLOSE = {
  "}": "{",
  "]": "[",
  ")": "(",
};
var isValid = function (s) {
  const STACK = [];
  const str = s.split("");
  for (const char of str) {
    if (!CLOSE[char]) {
      STACK.push(char);
      continue;
    }
    const openChar = STACK.pop();
    if (openChar !== char) {
      return false;
    }
  }

  return true;
};
