/*
 * Complete the function below.
 */
// DP Solution: https://www.youtube.com/watch?v=YDf982Lb84o

function how_many_BSTs(n) {
  if (n === 0) {
    return 0;
  }
  const DP_TABLE = [1, 1, 2];
  for (i = 3; i <= n; i++) {
    let val = 0;

    for (let j = 0; j < i; j++) {
      val += DP_TABLE[j] * DP_TABLE[i - j - 1];
    }

    DP_TABLE[i] = val;
  }

  return DP_TABLE[n];
}


console.log(how_many_BSTs(5));