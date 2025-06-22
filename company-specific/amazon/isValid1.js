const MAP = {
  "{": "}",
  "(": ")",
  "[": "]",
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const STACK = [];
  for (let i = 0; i < s.length; i++) {
    if (!!MAP[s[i]]) {
      STACK.push(MAP[s[i]]);
      continue;
    }
    if (STACK.pop() !== s[i]) {
      return false;
    }
  }
  return STACK.length === 0;
};
