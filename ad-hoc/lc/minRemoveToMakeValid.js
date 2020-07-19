// https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/

/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
  const LEFT = "(";
  const RIGHT = ")";

  const LEFT_STACK = [];
  const RIGHT_STACK = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === LEFT) {
      LEFT_STACK.push(i);
    }

    if (s[i] === RIGHT) {
      if (LEFT_STACK.length === 0) {
        RIGHT_STACK.push(i);
      } else {
        LEFT_STACK.pop();
      }
    }
  }

  const SKIP_SET = new Set([...LEFT_STACK, ...RIGHT_STACK]);

  const result = [];
  for (let i = 0; i < s.length; i++) {
    if (SKIP_SET.has(i)) {
      continue;
    }
    result.push(s[i]);
  }

  return result.join("");
};


