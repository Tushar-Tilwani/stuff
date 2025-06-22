/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
var arrayStringsAreEqual = function (word1, word2) {
  const len1 = word1.reduce((acc, word) => acc + word.length, 0);
  const len2 = word2.reduce((acc, word) => acc + word.length, 0);
  if (len1 !== len2) {
    return false;
  }
  for (let i = 0; i < word1.length; i++) {
    for (let j = 0; j < word1[i].length; j++) {
      if (word1[i][j] !== word2[i][j]) {
        return false;
      }
    }
  }

  return true;
};
