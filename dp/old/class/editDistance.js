/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = function(word1, word2) {
  const TABLE = [];
  const MAX_ROW = word1.length;
  const MAX_COL = word2.length;

  for (let i = 0; i <= MAX_ROW; i++) {
    TABLE[i] = [];
    for (let j = 0; j <= MAX_COL; j++) {
      TABLE[i][j] = Infinity;
    }
  }

  for (let i = 0; i <= MAX_ROW; i++) {
    TABLE[i][MAX_COL] = MAX_ROW - i;
  }
  for (let j = 0; j <= MAX_COL; j++) {
    TABLE[MAX_ROW][j] = MAX_COL - j;
  }

  for (let i = MAX_ROW - 1; i >= 0; i--) {
    for (let j = MAX_COL - 1; j >= 0; j--) {
      if (word1[i] === word2[j]) {
        TABLE[i][j] = TABLE[i + 1][j + 1];
      } else {
        TABLE[i][j] =
          1 + Math.min(TABLE[i + 1][j + 1], TABLE[i][j + 1], TABLE[i + 1][j]);
      }
    }
  }

  return TABLE[0][0];
};

console.log(minDistance("horse", "ros"));
