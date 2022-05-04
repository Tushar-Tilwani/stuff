/**
 * @param {str} word1
 * @param {str} word2
 * @return {int32}
 */
function levenshtein_distance(word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;

  const TABLE = new Array(len1 + 1)
    .fill()
    .map(() => new Array(len2 + 1).fill(0));

  for (let i = 1; i <= len1; i++) {
    TABLE[i][0] = i;
  }

  for (let j = 1; j <= len2; j++) {
    TABLE[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (word1[i] === word2[j]) {
        TABLE[i][j] = TABLE[i - 1][j - 1];
        continue;
      }
      TABLE[i][j] =
        Math.min(TABLE[i - 1][j - 1], TABLE[i - 1][j], TABLE[i][j - 1]) + 1;
    }
  }

  // Write your code here.
  return TABLE[len1][len2];
}
