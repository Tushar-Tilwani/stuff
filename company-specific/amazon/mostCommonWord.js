/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  const bannedSet = new Set(banned);
  const freqMap = paragraph
    .toLowerCase()
    .split(" ")
    .reduce((acc, v) => {
      if (!bannedSet.has(v)) {
        acc.set(v, (acc.get(v) ?? 0) + 1);
      }
      return acc;
    }, new Map());

  let maxKey = null;
  let maxVal = -Infinity;
  for (const [key, val] of freqMap.entries()) {
    if (val > maxVal) {
      maxKey = key;
      maxVal = val;
    }
  }
  return maxKey;
};
