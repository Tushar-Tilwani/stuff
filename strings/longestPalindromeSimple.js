/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const result = [[]];
  helper(s.split(""), 0, s.length - 1, result);
  return result[0].join("");
};

function helper(s, start, end, result) {
  if (end < start) {
    return;
  }
  const currentArr = s.slice(start, end + 1);
  if (isPalindrome(currentArr) && currentArr.length > result[0].length) {
    result[0] = currentArr;
  } else {
    helper(s, start, end - 1, result);
    helper(s, start + 1, end, result);
  }
}

function isPalindrome(strArr) {
  const len = strArr.length;
  const mid = Math.floor(len / 2);
  for (let i = 0; i < mid; i++) {
    if (strArr[len - 1 - i] !== strArr[i]) {
      return false;
    }
  }
  return true;
}

console.log(longestPalindrome("g42fdbbdbhc"));
