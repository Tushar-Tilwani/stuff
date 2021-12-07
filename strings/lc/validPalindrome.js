/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s, start, end) {
  for (let i = 0; i < end - start; i++) {
    if (s[start + i] !== s[end - i]) {
      return false;
    }
  }
  return true;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  const length = s.length - 1;
  const mid = Math.floor(length / 2);
  for (let i = 0; i <= mid; i++) {
    if (s[i] === s[length - i]) {
      continue;
    }
    //console.log(i, length - i - 1, "-----", i + 1, length - i);
    return (
      isPalindrome(s, i, length - i - 1) || isPalindrome(s, i + 1, length - i)
    );
  }

  return true;
};

// console.log(isPalindrome("abca", 0, 2));

// console.log(validPalindrome("cbbcc"));

//console.log(validPalindrome("abc"));
