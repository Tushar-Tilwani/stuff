/**
 * @param {number[]} arr
 * @return {number}
 */
var minimumMoves = function(arr) {
  const DPTABLE = [];
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    DPTABLE[i] = [];
    for (let j = 0; j < len; j++) {
      DPTABLE[i][j] = Infinity;
    }
  }

  for (let i = 0; i < len; i++) {
    for (let j = i; j >= 0; j--) {
      if (i == j) {
        DPTABLE[i][j] = 1;
        continue;
      }

      if (j === i - 1) {
        DPTABLE[i][j] = arr[i] === arr[j] ? 1 : 2;
        continue;
      }

      let mincost = DPTABLE[i - 1][j + 1];
      mincost = arr[i] === arr[j] ? mincost : mincost + 2;

      let c = i;
      while (c > j) {
        mincost = Math.min(mincost, DPTABLE[i][c] + DPTABLE[c - 1][j]);
        c--;
      }

      //   DPTABLE[i][j] = Math.min(
      //     DPTABLE[i][j],
      //     DPTABLE[i][j + 1] + 1,
      //     DPTABLE[i - 1][j] + 1
      //   );

      DPTABLE[i][j] = mincost;
    }
  }

  console.log(DPTABLE);
  return DPTABLE[len - 1][0];
};

let arr = [1, 4, 1, 1, 2, 3, 2, 1];
console.log(minimumMoves(arr));
