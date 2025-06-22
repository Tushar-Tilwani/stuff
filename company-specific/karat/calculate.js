//https://leetcode.com/problems/basic-calculator/
// DO it AGAIN
/**
 * @param {string} s
 * @return {number}
 */
function calculate(s) {
  const STACK = [];
  let currentSum = 0;
  let currentOp = true;
  let str = s.trim();
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const char = str[i];
    if (i < len && is_numeric(char)) {
      let num = 0;
      while (is_numeric(str[i])) {
        num = 10 * num + parseInt(str[i]);
        i++;
      }
      i--;
      currentSum = currentOp ? num + currentSum : currentSum - num;
    } else if (char === "(") {
      STACK.push(currentSum);
      STACK.push(currentOp);
      currentSum = 0;
      currentOp = true;
    } else if (char === ")") {
      const op = STACK.pop();
      const num = STACK.pop();
      currentSum = op ? num + currentSum : num - currentSum;
    } else if (char === "+") {
      currentOp = true;
    } else if (char === "-") {
      currentOp = false;
    }
  }

  return currentSum;
}

function is_numeric(str) {
  return /^\d+$/.test(str);
}
console.log(calculate("- (3 + (4 + 5))"));
