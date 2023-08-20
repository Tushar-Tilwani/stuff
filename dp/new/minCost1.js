/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  const TABLE = [[0, 0, 0]];
  for (const cost of costs) {
    const lastIndex = TABLE.length - 1;
    TABLE.push([
      Math.min(TABLE[lastIndex][1], TABLE[lastIndex][2]) + cost[0],
      Math.min(TABLE[lastIndex][0], TABLE[lastIndex][2]) + cost[1],
      Math.min(TABLE[lastIndex][0], TABLE[lastIndex][1]) + cost[2],
    ]);
  }

  return Math.min(...TABLE[TABLE.length - 1]);
};
