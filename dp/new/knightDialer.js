const KnightMapping = {
  "-1": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  0: [4, 6],
  1: [8, 6],
  2: [7, 9],
  3: [4, 8],
  4: [0, 3, 9],
  5: [],
  6: [0, 1, 7],
  7: [2, 6],
  8: [1, 3],
  9: [2, 4],
};

const MOD = 10 ** 9 + 7;
const sum = (arr) => arr.reduce((acc, v) => (acc + v) % MOD, 0);
const TOTAL_NUM = 10;

/**
 * @param {number} n
 * @return {number}
 */
var knightDialer = function (n) {
  const TABLE = new Array(n + 1).fill().map(() => new Array(TOTAL_NUM).fill(0));
  for (let num = 0; num < TOTAL_NUM; num++) {
    TABLE[0][num] = 1;
  }

  for (let i = 1; i < n; i++) {
    for (let num = 0; num < TOTAL_NUM; num++) {
      const froms = KnightMapping[num];
      for (const from of froms) {
        TABLE[i][num] += TABLE[i - 1][from];
      }
      TABLE[i][num] %= MOD;
    }
  }

  return sum(TABLE[n - 1]);
};
