/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const set = new Set();

  let left = 0;
  let right = 0;
  const result = [0];
  while (right < s.length) {
    const c = s.charAt(right);
    if (!set.has(c)) {
      set.add(c);
      right++;
      result[0] = Math.max(right - left, result[0]);
    } else {
      set.delete(s.charAt(left));
      left++;
    }
  }

  return result[0];
};

console.log(lengthOfLongestSubstring("bbbbb"));
