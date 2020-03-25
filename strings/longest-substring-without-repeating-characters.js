// https://leetcode.com/problems/longest-substring-without-repeating-characters/
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let left = 0,
    right = 0;
  let result = [left, right];
  const strArr = s.split("");
  const set = new Set();

  while (right < strArr.length) {
    if (set.has(strArr[right])) {
      set.delete(strArr[left]);
      left++;
    } else {
      const [start, end] = result;
      if (end - start < right - left) {
        result = [left, right];
      }
      set.add(strArr[right]);
      right++;
    }
  }
  const [start, end] = result;
  return s.slice(start, end + 1);
};

console.log(lengthOfLongestSubstring("abcabcbb"));
