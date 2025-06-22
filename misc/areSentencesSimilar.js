/**
 * @param {string[]} sentence1
 * @param {string[]} sentence2
 * @param {string[][]} similarPairs
 * @return {boolean}
 */
var areSentencesSimilar = function (sentence1, sentence2, similarPairs) {
  if (sentence1.length !== sentence2.length) {
    return false;
  }

  const wordDict = similarPairs.reduce((acc, [val1, val2]) => {
    if (!acc.has(val1)) {
      acc.set(val1, new Set());
    }
    if (!acc.has(val2)) {
      acc.set(val2, new Set());
    }
    acc.get(val1).add(val2);

    acc.get(val2).add(val1);

    return acc;
  }, new Map());

  for (let i = 0; i < sentence1.length; i++) {
    const word1 = sentence1[i];
    const word2 = sentence2[i];
    if (
      (wordDict.has(word1) &&
        wordDict.has(word2) &&
        wordDict.get(word1).has(word2) &&
        wordDict.get(word2).has(word1)) ||
      word1 === word2
    ) {
      continue;
    }
    return false;
  }

  return true;
};
