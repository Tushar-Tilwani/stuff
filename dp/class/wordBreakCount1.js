/**
 * @param {string[]} wordDict
 * @param {string} s
 * @return {boolean}
 */
const MOD = 1e9 + 7;
const wordBreakCount = function(wordDict, s) {
  const set = new Set(wordDict);
  const maxLen = wordDict.reduce((acc, word) => Math.max(acc, word.length), 0);
  const len = s.length;
  const TABLE = [1];
  for (let i = 1; i <= len; i++) {
    TABLE[i] = 0;
    for (let j = i - 1; j >= 0 && j - i <= maxLen; j--) {
      const str = s.slice(j, i);
      /**
       * Just console log str. You'll know what's happening.
       */
      if (set.has(str)) {
        TABLE[i] = (TABLE[i] + TABLE[j]) % MOD;
      }
    }
  }
  return TABLE[len];
};

d = ["kick", "start", "kickstart", "is", "awe", "some", "awesome"];
s = "kickstartisawesome";
console.log(wordBreakCount(d, s));
