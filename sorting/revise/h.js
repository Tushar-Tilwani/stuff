/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = [];
  const PAREN_MAP = {
    ")": "(",
    "]": "[",
    "}": "{"
  };
  const strArr = s.split("");

  for (const char of strArr) {
    if (!PAREN_MAP[char]) {
      stack.push(char);
    } else if (stack.pop() !== PAREN_MAP[char]) {
      return false;
    }
  }

  return stack.length === 0;
};

console.log(isValid("()[([])]{}"));
