/**
 * @param {number} num
 * @return {number}
 */
var largestInteger = function (num) {
  const nums = num
    .toString()
    .split("")
    .map((a) => parseInt(a));

  const oddNums = nums.filter((a) => a % 2 === 1).sort((a, b) => a - b);
  const evenNums = nums.filter((a) => a % 2 === 0).sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      result.push(evenNums.pop());
    } else {
      result.push(oddNums.pop());
    }
  }
  return parseInt(result.join(""));
};
