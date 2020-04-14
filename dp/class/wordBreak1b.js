// https://leetcode.com/problems/word-break/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const set = new Set(wordDict);
  const len = s.length;
  const TABLE = [true];
  for (let i = 1; i <= len; i++) {
    TABLE[i] = false;
    for (let j = i - 1; j >= 0; j--) {
      const str = s.slice(j, i);
      if (set.has(str)) {
        TABLE[i] = TABLE[i] || TABLE[j];
      }
    }
  }
  return TABLE[len];
};

console.log(wordBreak("abc", ["a", "bc"]));
