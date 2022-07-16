/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function (s) {
  const freqSet = new Set();
  for (let i = 0; i < s.length; i++) {
    if (freqSet.has(s[i])) {
      freqSet.delete(s[i]);
    } else {
      freqSet.add(s[i]);
    }
  }

  return freqSet.size <= 1;
};
