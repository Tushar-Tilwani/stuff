/*
 * Complete the function below.
 */
function levenshteinDistance(strWord1, strWord2) {
  const len1 = strWord1.length;
  const len2 = strWord2.length;

  // Initialize Table
  const DPTable = [];
  for (let i = 0; i <= len1; i++) {
    DPTable[i] = [];
    for (let j = 0; j <= len2; j++) {
      DPTable[i][j] = Infinity;
    }
  }

  // Add base case

  // fill cols
  for (let i = len1; i >= 0; i--) {
    DPTable[i][len2] = len1 - i;
  }

  // fill rows
  for (let j = len2; j >= 0; j--) {
    DPTable[len1][j] = len2 - j;
  }

  // Apply recurrence equation
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      if (strWord1.charAt(i) === strWord2.charAt(j)) {
        DPTable[i][j] = DPTable[i + 1][j + 1];
      } else {
        DPTable[i][j] =
          1 +
          Math.min(DPTable[i][j + 1], DPTable[i + 1][j], DPTable[i + 1][j + 1]);
      }
    }
  }
  return DPTable[0][0];
}

console.log(levenshteinDistance('divya', 'tushar'));
