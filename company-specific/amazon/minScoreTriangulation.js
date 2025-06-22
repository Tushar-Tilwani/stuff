/**
 * @param {number[]} values
 * @return {number}
 */
var minScoreTriangulation = function (values) {
  const sortedValues = values.sort((a, b) => a - b);
  const len = sortedValues.length - 2;
  const product = sortedValues[0] * sortedValues[1];
  let result = 0;
  for (let i = 2; i < len; i++) {
    result += product * sortedValues[i];
  }
  return result;
};
