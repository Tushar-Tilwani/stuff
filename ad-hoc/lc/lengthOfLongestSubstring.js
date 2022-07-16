/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let start = 0;
  let end = 0;
  let indexMap = new Map();
  let max = 0;

  while (end < s.length) {
    if (indexMap.has(s[end])) {
      while (start < indexMap.get(s[end])) {
        indexMap.delete(s[start]);
        start++;
      }
    }
    indexMap.set(s[end], end);
    max = Math.max(max, end - start + 1);
    end++;
  }
  return max;
};
