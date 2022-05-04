/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
  const orderMap = order.split("").reduce((map, char, index) => {
    map.set(char, index);
    return map;
  }, new Map());

  for (let i = 0; i < words.length - 1; i++) {
    if (!compareWords(words[i], words[i + 1], orderMap)) {
      return false;
    }
  }
  return true;
};

function compareWords(word1, word2, orderMap) {
  const len = Math.min(word1.length, word2.length);
  let i = 0;
  while (i < len) {
    if (orderMap.get(word1[i]) < orderMap.get(word2[i])) {
      return true;
    }
    if (orderMap.get(word1[i]) > orderMap.get(word2[i])) {
      return false;
    }
    i++;
  }
  return i === word1.length;
}
