/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function(words) {
  if (words.length < 1) {
    return [];
  }
  const result = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i === j) {
        continue;
      }
      const concatStr = `${words[i]}${words[j]}`;
      if (isPalindrome(concatStr)) {
        result.push([i, j]);
      }
    }
  }
  return result;
};

function isPalindrome(strArr) {
  const len = strArr.length;
  const mid = Math.floor(len / 2);
  for (let i = 0; i < mid; i++) {
    if (strArr.charAt(len - 1 - i) !== strArr.charAt(i)) {
      return false;
    }
  }
  return true;
}
