/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  const TABLE = [0, 1, 2];
  for (let i = 3; i < n; i++) {
    TABLE[i] = TABLE[i - 1] + TABLE[i - 2];
  }
  return TABLE[n];
}
