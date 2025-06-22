// https://leetcode.com/problems/word-break-ii/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const set = new Set(wordDict);
  const len = s.length;
  const SOLUTION_TABLE = [[]];
  for (let i = 1; i <= len; i++) {
    SOLUTION_TABLE[i] = [];
    for (let j = i - 1; j >= 0; j--) {
      const str = s.slice(j, i);
      if (!set.has(str)) {
        continue;
      }
      // Missed here. Makes sure to pcheck if j has solutions.
      if (SOLUTION_TABLE[j].length > 0) {
        SOLUTION_TABLE[i].push(j);
      }
    }
  }
  const result = [];
  console.log(SOLUTION_TABLE[SOLUTION_TABLE.length - 1]);
  // getSolution(SOLUTION_TABLE, s, SOLUTION_TABLE.length - 1, [], result);
  return result;
};

function getSolution(SOLUTION_TABLE, str, index, path, result) {
  if (index === 0) {
    result.push(
      path
        .slice(0)
        .reverse()
        .join(" ")
    );
    return result;
  }
  const arr = SOLUTION_TABLE[index];

  for (const value of arr) {
    path.push(str.slice(value, index));
    getSolution(SOLUTION_TABLE, str, value, path, result);
    path.pop();
  }

  return result;
}

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
