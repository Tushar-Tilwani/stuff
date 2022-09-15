/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const len = temperatures.length;
  const result = new Array(len).fill(0);
  for (let i = 0; i < len; i++) {
    let val = 0;
    for (let j = i + 1; j < len; j++) {
      if (temperatures[i] < temperatures[j]) {
        result[i] = val + 1;
        break;
      }
      val++;
    }
  }
  return result;
};
