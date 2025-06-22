//https://leetcode.com/problems/evaluate-reverse-polish-notation/

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const STACK = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === "+") {
      STACK.push(STACK.pop() + STACK.pop());
    } else if (token === "-") {
      const first = STACK.pop();
      const second = STACK.pop();
      STACK.push(Math.floor(second - first));
    } else if (token === "*") {
      STACK.push(STACK.pop() * STACK.pop());
    } else if (token === "/") {
      const first = STACK.pop();
      const second = STACK.pop();
      STACK.push(Math.floor(second / first));
    } else {
      STACK.push(parseInt(token));
    }
  }
  return STACK[0];
};
