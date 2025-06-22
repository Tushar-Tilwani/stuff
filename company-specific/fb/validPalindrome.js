/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  const end = s.length - 1;
  const mid = Math.floor(end / 2);
  for (let i = 0; i <= mid; i++) {
    if (s[i] !== s[end - i]) {
      return isPalindrome(s, i + 1, end - i) || isPalindrome(s, i, end - i - 1);
    }
  }
  return true;
};

function isPalindrome(chars, start, end) {
  while (start < end) {
    if (chars[start] !== chars[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

console.log(validPalindrome("tcaac"));
