const OFFSET = Math.pow(10, 5);

/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} k
 * @return {number}
 */
function mincostToHireWorkers(quality, wage, k) {
  const len = quality.length;
  let result = Infinity;
  for (let i = 0; i < len; i++) {
    const ratio = wage[i] / quality[i];
    result = Math.min(
      result,
      calculateMinWageForRatio(quality, wage, k, ratio)
    );
  }
  return Math.round(result * OFFSET) / OFFSET;
}

function calculateMinWageForRatio(quality, wage, k, ratio) {
  const result = [];
  const len = quality.length;
  for (let i = 0; i < len; i++) {
    const minWage = ratio * quality[i];
    if (minWage >= wage[i]) {
      result.push(minWage);
    }
  }
  if (result.length < k) {
    return Infinity;
  }
  result.sort((a, b) => a - b);
  const arr = result.slice(0, k);
  const sum = arr.reduce((acc, v) => acc + v);
  console.log([arr, sum]);
  return sum;
}

// let quality = [10, 20, 5],
//   wage = [70, 50, 30],
//   k = 2;

let quality = [3, 1, 8, 10, 1],
  wage = [4, 8, 2, 2, 7],
  k = 4;
console.log(mincostToHireWorkers(quality, wage, k));
