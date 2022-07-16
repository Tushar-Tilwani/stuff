/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
  const result = [0];
  helper(nums, 0, 0, Infinity, -Infinity, result);
  return result[0];
};

function helper(nums, index, count, min, max, result) {
  if (nums.length === index) {
    return;
  }
  if (isFinite(max - min) && max - min > 1) {
    return;
  }

  result[0] = max - min === 1 ? Math.max(result[0], count) : result[0];
  for (let i = index; i < nums.length; i++) {
    const num = nums[i];
    helper(
      nums,
      i + 1,
      count + 1,
      Math.min(min, num),
      Math.max(max, num),
      result
    );
  }
}
