/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const chars = s
    .split("")
    .filter((char) => char.match(/^[a-z0-9]+$/i))
    .map((char) => char.toLocaleLowerCase());
  const len = chars.length;
  const mid = Math.floor(len / 2);

  for (let i = 0; i < mid; i++) {
    if (chars[i] !== chars[len - i - 1]) {
      return false;
    }
  }
  return true;
};
