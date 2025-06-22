/**
 * @param {string} s
 * @return {string}
 */

var longestPalindrome = function(s) {
  if (!s) {
    return "";
  }
  let result = "";
  const len = s.length;
  const arr = s.split("");
  for (let i = 0; i < len; i++) {
    let start = i;
    let end = i;
    while (start >= 0 && end < len) {
      if (arr[start] !== arr[end]) {
        break;
      }
      if (result.length < end - start + 1) {
        result = arr.slice(start, end + 1);
      }
      start -= 1;
      end += 1;
    }
  }

  for (let i = 1; i < len; i++) {
    let start = i - 1;
    let end = i;
    while (start >= 0 && end < len) {
      if (arr[start] !== arr[end]) {
        break;
      }
      if (result.length < end - start + 1) {
        result = arr.slice(start, end + 1);
      }
      start -= 1;
      end += 1;
    }
  }

  return result;
};

console.log(longestPalindrome("bbbbd"));
