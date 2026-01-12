/**
 *
 * @param stones
 * [a,b,c]
 * [a-b,c]
 * [c -a + b]
 * [c,b], [a]
 * Basically we need to divide the [a,b,c] into two sets where |sum(set1) - sum(set2)| is minimum
 */

function lastStoneWeightII(stones: number[]): number {
  const sum = stones.reduce((acc, val) => acc + val, 0);
  const target = Math.floor(sum / 2);
  const len = stones.length;
  const TABLE = new Array(len + 1).fill(null).map(() => new Array(target + 1).fill(0));
  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= target; j++) {
      // did not choose
      const didNotChoose = TABLE[i - 1][j];

      const previousSum = j - stones[i - 1];
      const newSum = previousSum >= 0 ? TABLE[i - 1][previousSum] + stones[i - 1] : Infinity;
      // Do not go over the currentSum i.e. j;
      const isValid = newSum <= j;
      const choose = isValid ? newSum : -Infinity; /** Discard */

      TABLE[i][j] = Math.max(didNotChoose, choose);
    }
  }

  console.log(TABLE);

  return sum - TABLE[len][target];
}
