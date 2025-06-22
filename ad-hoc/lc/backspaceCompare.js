/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  const STACK1 = [];
  const STACK2 = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "#") {
      STACK1.pop();
      continue;
    }
    STACK1.push(s[i]);
  }

  for (let i = 0; i < t.length; i++) {
    if (t[i] === "#") {
      STACK2.pop();
      continue;
    }
    STACK2.push(t[i]);
  }

  return STACK1.join("") == STACK2.join("");
};
