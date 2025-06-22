/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
  const sortedNums = nums.sort((a, b) => a - b);
  let result = 0;
  let start = 0;
  let end = 1;
  while (end < nums.length) {
    const diff = sortedNums[end] - sortedNums[start];
    if (diff <= 1) {
      if (diff === 1) {
        result = Math.max(result, end - start + 1);
      }
      end++;
    } else {
      start++;
      end++;
    }
  }
  return result;
};
