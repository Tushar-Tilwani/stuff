/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
  let left = 0;
  let right = 0;
  const set = new Set();

  // [0,-1] instead of [0,0] so that answer comes out as 0 for empty strings
  let range = [0, -1];

  while (right < s.length) {
    if (set.has(s[right])) {
      set.delete(s[left]);
      left++;
      continue;
    }
    const [lLeft, lRight] = range;
    if (lRight - lLeft < right - left) {
      range = [left, right];
    }
    set.add(s[right]);
    right++;
  }

  //   console.log(s.slice(range[0], range[1] + 1));
  return range[1] - range[0] + 1;
};

console.log(lengthOfLongestSubstring("abcabc"));
