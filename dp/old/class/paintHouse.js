// https://leetcode.com/problems/paint-house/

/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function(costs) {
  const TABLE = [[0, 0, 0]];
  let i = 1;
  for (const cost of costs) {
    TABLE[i] = [];
    TABLE[i][0] = cost[0] + Math.min(TABLE[i - 1][1], TABLE[i - 1][2]);
    TABLE[i][1] = cost[1] + Math.min(TABLE[i - 1][0], TABLE[i - 1][2]);
    TABLE[i][2] = cost[2] + Math.min(TABLE[i - 1][0], TABLE[i - 1][1]);
    i++;
  }
  return Math.min(...TABLE[TABLE.length - 1]);
};
