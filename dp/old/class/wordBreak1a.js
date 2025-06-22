// https://leetcode.com/problems/word-break/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const set = new Set(wordDict);
  const TABLE = [];
  const len = s.length;
  //   for (let i = 0; i <= len; i++) {
  //     TABLE[i] = false;
  //   }

  TABLE[len] = true;

  for (let i = len - 1; i >= 0; i--) {
    TABLE[i] = false;
    for (let j = i + 1; j <= len; j++) {
      const str = s.slice(i, j);
      if (set.has(str)) {
        TABLE[i] = TABLE[i] || TABLE[j];
      }
    }
  }
  return TABLE[0];
};

console.log(wordBreak("abc", ["a", "bc"]));
