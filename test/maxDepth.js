/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  let result = 0;
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      count += 1;
    }
    if (s[i] === ")") {
      count -= 1;
    }
    result = Math.max(result, count);
  }
  return result;
};
