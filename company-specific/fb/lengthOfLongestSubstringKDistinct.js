/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
  let left = 0;
  let right = 0;
  const countMap = new Map();
  let result = 0;
  while (right < s.length) {
    countMap.set(s[right], (countMap.get(s[right]) ?? 0) + 1);
    if (countMap.size > k) {
      const leftCount = countMap.get(s[left]) - 1;
      if (leftCount === 0) {
        countMap.delete(s[left]);
      } else {
        countMap.set(s[left], leftCount);
      }
      left++;
    } else {
      result = Math.max(result, right - left + 1);
    }
    right++;
  }

  return result;
};

console.log(lengthOfLongestSubstringKDistinct("abeeeee", 1));
