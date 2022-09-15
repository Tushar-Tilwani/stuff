/**
 * @param {string} s
 * @return {string}
 */
function reverseParentheses(s) {
  const STACK = [];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === ")") {
      let poppedChar;
      const LOCAL_STACK = [];
      while ((poppedChar = STACK.pop()) !== "(") {
        LOCAL_STACK.push(poppedChar);
      }
      STACK.push(...LOCAL_STACK);
      continue;
    }
    STACK.push(char);
  }
  return STACK;
}

let s = "(u(love)i)";
s = "(ed(et(oc))el)";
s = "(abcd)";

console.log(reverseParentheses(s));
