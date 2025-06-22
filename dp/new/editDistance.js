/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  let m = word1.length;
  let n = word2.length;
  const TABLE = new Array(m + 1)
    .fill()
    .map(() => new Array(n + 1).fill(Infinity));
  TABLE[0][0] = 0;
  for (let i = 1; i <= m; i++) {
    TABLE[i][0] = TABLE[i - 1][0] + 1;
  }

  for (let j = 1; j <= n; j++) {
    TABLE[0][j] = TABLE[0][j - 1] + 1;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        TABLE[i][j] = TABLE[i - 1][j - 1];
      } else {
        TABLE[i][j] =
          Math.min(TABLE[i][j - 1], TABLE[i - 1][j], TABLE[i - 1][j - 1]) + 1;
      }
    }
  }
  return TABLE[m][n];
}
