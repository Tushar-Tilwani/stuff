/**
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;
  const regex = /^[a-z0-9]+$/i;
  while (left < right) {
    if (!regex.test(s[left])) {
      left++;
      continue;
    }

    if (!regex.test(s[right])) {
      right--;
      continue;
    }
    if (s[left].toLocaleUpperCase() !== s[right].toLocaleUpperCase()) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};
