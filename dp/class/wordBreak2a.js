// https://leetcode.com/problems/word-break-ii/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const set = new Set(wordDict);
  const len = s.length;
  const SOLUTION_TABLE = [[""]];
  for (let i = 1; i <= len; i++) {
    SOLUTION_TABLE[i] = [];
    for (let j = i - 1; j >= 0; j--) {
      const str = s.slice(j, i);
      if (!set.has(str)) {
        continue;
      }
      SOLUTION_TABLE[j].forEach(prevStr => {
        if (!prevStr) {
          SOLUTION_TABLE[i].push(str);
          return;
        }
        SOLUTION_TABLE[i].push(`${prevStr} ${str}`);
      });
    }
  }
  return SOLUTION_TABLE[len];
};

s = "catsanddog";
wordDict = ["cat", "cats", "and", "sand", "dog"];

// s =
//   "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
// wordDict = [
//   "a",
//   "aa",
//   "aaa",
//   "aaaa",
//   "aaaaa",
//   "aaaaaa",
//   "aaaaaaa",
//   "aaaaaaaa",
//   "aaaaaaaaa",
//   "aaaaaaaaaa"
// ];

console.log(wordBreak(s, wordDict));
