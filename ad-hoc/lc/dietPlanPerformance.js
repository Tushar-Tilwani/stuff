/**
 * @param {number[]} calories
 * @param {number} k
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var dietPlanPerformance = function (calories, k, lower, upper) {
  let sum = calories.slice(0, k).reduce((acc, v) => acc + v, 0);
  let result = 0;

  for (let i = k; i < calories.length; i++) {
    if (sum > upper) {
      result += 1;
    }

    if (sum < lower) {
      result -= 1;
    }
    sum -= calories[i - k];
    sum += calories[i + 1] ?? 0;
  }

  return result;
};
