/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCostII = function (costs) {
  const TABLE = [costs[0]];
  const NUM_OF_COLORS = costs[0].length;
  const NUM_OF_HOUSES = costs.length;

  for (let house = 1; house < NUM_OF_HOUSES; house++) {
    TABLE[house] = [];
    for (let color = 0; color < NUM_OF_COLORS; color++) {
      const prevColors = [...TABLE[house - 1]];
      prevColors.splice(color, 1);
      const previousMin = Math.min(...prevColors);
      TABLE[house][color] = costs[house][color] + previousMin;
    }
  }

  console.log(TABLE);

  return Math.min(...TABLE[NUM_OF_HOUSES - 1]);
};
