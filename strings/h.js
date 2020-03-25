/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
  if (!s) {
    return 0;
  }
  let left = 0,
    right = 0;
  let result = [0, 0];
  let strArr = s.split("");
  const map = new Map();
  const K = 2;

  while (right <= strArr.length) {
    if (map.size <= K) {
      //   console.log(map, left, right);
      const [start, end] = result;

      if (end - start < right - left && map.size === K) {
        result = [left, right];
      }
      map.set(strArr[right], map.get(strArr[right]) + 1 || 1);
      right++;
    } else {
      const leftChar = strArr[left];
      const leftCharFreq = map.get(leftChar);
      if (leftCharFreq === 1) {
        map.delete(leftChar);
      } else {
        map.set(leftChar, leftCharFreq - 1);
      }
      left++;
    }
  }
  const [start, end] = result;
  //   console.log(s.slice(start, end));
  return end - start;
};

console.log(lengthOfLongestSubstringTwoDistinct("aaa"));
