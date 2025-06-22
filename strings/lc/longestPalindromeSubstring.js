/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    result = Math.max(
      result,
      expandFromMiddle(s, i, i),
      expandFromMiddle(s, i, i + 1)
    );
  }
  return result;
};

function expandFromMiddle(s, start, end) {
  let result = 0;
  while (start >= 0 && end < s.length) {
    if (s[start] !== s[end]) {
      break;
    }
    result = Math.max(result, end - start + 1);
    start--;
    end++;
  }
  return result;
}
