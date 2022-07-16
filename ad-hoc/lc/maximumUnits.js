/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
  const sortedBoxTypes = boxTypes.sort((a, b) => b[0] - a[0]);
  let result = 0;
  let sizeLeft = truckSize;
  for (const [numberOfBoxes, units] of sortedBoxTypes) {
    if (sizeLeft <= 0) {
      break;
    }
    result += Math.min(sizeLeft, numberOfBoxes) * units;
    sizeLeft -= numberOfBoxes;
  }
  return result;
};
