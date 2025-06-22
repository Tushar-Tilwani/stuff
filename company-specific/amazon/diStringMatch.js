/**
 * @param {string} s
 * @return {number[]}
 */
var diStringMatch = function (s) {
  const result = [0];
  let min = 0;
  let max = 0;
  const chars = s.split("");
  for (const char of chars) {
    if (char === "I") {
      max += 1;
      result.push(max);
    } else {
      min -= 1;
      result.push(min);
    }
  }

  return result.map((v) => v - min);
};
