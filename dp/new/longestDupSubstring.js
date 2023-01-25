/**
 * @param {string} s
 * @return {string}
 */
var longestDupSubstring = function (s) {
  const set = new Set();
  for (let size = s.length - 1; size > 1; size--) {
    for (let start = 0; start + size <= s.length; start++) {
      const subStr = s.slice(start, start + size);
      if (set.has(subStr)) {
        return subStr;
      }
      set.add(subStr);
    }
  }
  return "";
};
