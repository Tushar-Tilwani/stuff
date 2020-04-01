/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} K
 * @return {number}
 */
var mincostToHireWorkers = function(quality, wage, K) {
  const result = [Infinity];
  helper(quality, wage, [], 0, K, result);
  return result[0];
};

function helper(quality, wage, selected, startingIndex, K, result) {
  if (selected.length === K) {
    result[0] = Math.min(result[0], calculateWage(quality, wage, selected));
    return;
  }

  for (let i = startingIndex; i < quality.length; i++) {
    selected.push(i);
    helper(quality, wage, selected, i + 1, K, result);
    selected.pop();
  }
}

function calculateWage(quality, wage, selectedWorkers) {
  let mostExpensive = 0;
  for (const worker of selectedWorkers) {
    const wageOverQuality = wage[worker] / quality[worker];
    if (mostExpensive < wageOverQuality) {
      mostExpensive = wageOverQuality;
    }
  }

  let cost = 0;
  for (const worker of selectedWorkers) {
    cost += mostExpensive * quality[worker];
  }
  return cost.toFixed(5);
}

(quality = [10, 20, 5]), (wage = [70, 50, 30]), (K = 2);
(quality = [3, 1, 10, 10, 1]), (wage = [4, 8, 2, 2, 7]), (K = 3);
console.log(mincostToHireWorkers(quality, wage, K));
