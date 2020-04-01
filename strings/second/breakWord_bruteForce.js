// https://leetcode.com/problems/word-break/
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */

function wordBreak(s, wordDict) {
  if (s === "") {
    return true;
  }
  for (let word of wordDict) {
    if (s.slice(0, word.length) === word) {
      const newS = s.slice(word.length, s.length);
      if (wordBreak(newS, wordDict)) {
        return true;
      }
    }
  }
  return false;
}

// const s = "leetcode", wordDict = ["leet", "code"];
const s = "applepenapple",
  wordDict = ["apple", "pen"];
console.log(wordBreak(s, wordDict));
