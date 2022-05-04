/**
 * @param {number} n
 * @return {number}
 */
var bulbSwitch = function (n) {
  const bulbs = new Array(n).fill(true);
  for (let round = 2; round <= n; round++) {
    for (let i = round - 1; i < bulbs.length; i = i + round) {
      bulbs[i] = !bulbs[i];
    }
  }
  return bulbs.filter((b) => b).length;
};
