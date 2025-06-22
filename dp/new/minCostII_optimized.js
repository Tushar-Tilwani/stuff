/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCostII = function (costs) {
  const TABLE = [];
  const NUM_OF_COLORS = costs[0].length;
  const NUM_OF_HOUSES = costs.length;
rrerer
  // Track two most min values in prev array
  let minValues = [0, 0, -1];

  for (let house = 0; house < NUM_OF_HOUSES; house++) {
    TABLE[house] = [];
    const [minVal, secMinVal, minIndex] = minValues;
    let [newMinVal, newSecMinVal, newMinIndex] = [Infinity, Infinity, -1];
    for (let color = 0; color < NUM_OF_COLORS; color++) {
      const minCost =
        color !== minIndex
          ? costs[house][color] + minVal
          : costs[house][color] + secMinVal;

      if (minCost < newMinVal) {
        newSecMinVal = newMinVal;
        newMinVal = minCost;
        newMinIndex = color;
      } else if (minCost < newSecMinVal) {
        newSecMinVal = minCost;
      }

      TABLE[house][color] = minCost;
    }
    minValues = [newMinVal, newSecMinVal, newMinIndex];
  }

  return Math.min(...TABLE[NUM_OF_HOUSES - 1]);
};
