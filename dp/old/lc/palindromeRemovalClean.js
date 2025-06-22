/**
 * Hey future tushar. Lets go over the solution now
 * Basically there are these cases:
 * [1,2,3,1,5]
 * You will pass: Min(
 * [1,[2,3,1],5]
 * [[1,2,3,1]+ [5]]
 * [[1,2,3] + [1,5]]
 * [[1,2] + [3,1,5]]
 * [[1] + [2,3,1,5]]
 * );
 *
 * Watch: https://www.youtube.com/watch?v=KxvTeK2nv28
 */

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

  for (let start = len - 1; start >= 0; start--) {
    for (let end = start; end < len; end++) {
      if (start === end) {
        DPTABLE[start][end] = 1;
        continue;
      }

      if (start === end - 1) {
        DPTABLE[start][end] = arr[start] === arr[end] ? 1 : 2;
        continue;
      }

      let minCost =
        arr[start] === arr[end]
          ? DPTABLE[start + 1][end - 1]
          : DPTABLE[start + 1][end - 1] + 2;

      for (let k = start; k < end; k++) {
        minCost = Math.min(minCost, DPTABLE[start][k] + DPTABLE[k + 1][end]);
      }

      DPTABLE[start][end] = minCost;
    }
  }

  return DPTABLE[0][len - 1];
};

let arr = [1, 4, 1, 1, 2, 3, 2, 1];
arr = [16, 13, 13, 10, 12];
console.log(minimumMoves(arr));
