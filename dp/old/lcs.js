/*
 * Complete the 'lcs' function below.
 *
 * The function accepts STRING a and STRING b as parameter.
 * The function is expected to return a STRING.
 */
function lcs(a, b) {
  // Write your code here
  const DP_TABLE = [];
  const MAX_ROW = a.length - 1;
  const MAX_COL = b.length - 1;

  /* From recursion 
   if (str1[i1] === str2[i2]) {
    path.push(str1[i1]);
    helper(str1, i1 + 1, str2, i2 + 1, path, result);
    path.pop();
  } else {
    helper(str1, i1 + 1, str2, i2, path, result);
    helper(str1, i1, str2, i2 + 1, path, result);
  }
  */

  for (let i = 0; i <= MAX_ROW + 1; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j <= MAX_COL + 1; j++) {
      DP_TABLE[i].push("");
    }
  }

  for (let i = MAX_ROW; i >= 0; i--) {
    for (let j = MAX_COL; j >= 0; j--) {
      DP_TABLE[i][j] =
        a[i] === b[j]
          ? a[i] + DP_TABLE[i + 1][j + 1]
          : getMaxStr(DP_TABLE[i + 1][j], DP_TABLE[i][j + 1]);
    }
  }

  return DP_TABLE[0][0];
}

function getMaxStr(str1, str2) {
  if (str1.length > str2.length) {
    return str1;
  }
  return str2;
}

console.log(lcs("AAAABA", "ABA"));
