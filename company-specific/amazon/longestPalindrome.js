/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const strArr = s.split("");
  let result = [0, 0];
  for (let i = 0; i < strArr.length; i++) {
    const [start, end] = result;
    const [localStart, localEnd] = checkPalindrome(strArr, i, i);
    if (localEnd - localStart > end - start) {
      result = [localStart, localEnd];
    }
  }

  for (let i = 0; i < strArr.length; i++) {
    const [start, end] = result;
    const [localStart, localEnd] = checkPalindrome(strArr, i, i + 1);
    if (localEnd - localStart > end - start) {
      result = [localStart, localEnd];
    }
  }

  const [start, end] = result;
  return strArr.slice(start, end + 1).join("");
};

function checkPalindrome(strArr, start, end) {
  while (strArr[start] && strArr[end] && strArr[start] === strArr[end]) {
    start--;
    end++;
  }

  return [start + 1, end - 1];
}
