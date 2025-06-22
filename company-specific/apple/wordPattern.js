/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const strArr = s.split(" ");
  if (strArr.length !== pattern.length) {
    return false;
  }
  const wordMap = new Map();
  const charMap = new Map();
  for (let i = 0; i < pattern.length; i++) {
    console.log(wordMap, charMap);
    const char = pattern[i];
    const word = strArr[i];

    if (wordMap.has(char)) {
      if (wordMap.get(char) !== word) {
        return false;
      }
    }

    if (charMap.has(word)) {
      if (charMap.get(word) !== char) {
        return false;
      }
    }

    wordMap.set(char, word);
    charMap.set(word, char);
  }
  return true;
};
