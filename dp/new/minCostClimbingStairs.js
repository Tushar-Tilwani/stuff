/**
 * @param {number[]} cost
 * @return {number}
 */
function minCostClimbingStairs(cost) {
  const len = cost.length;
  const TABLE = [cost[0], cost[1]];
  for (let i = 2; i < len; i++) {
    TABLE[i] = cost[0] + Math.min(TABLE[i - 1], TABLE[i - 2]);
  }
  return Math.min(TABLE[len - 1], TABLE[len - 2]);
}
