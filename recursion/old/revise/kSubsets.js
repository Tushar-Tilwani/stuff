/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function(nums, k) {
  const targetSum = nums.reduce((acc, v) => acc + v, 0) / k;
  if (!Number.isInteger(targetSum)) {
    return false;
  }
  const result = [];
  helper(nums, 0, [], targetSum, result);
  return result;
};

function helper(nums, index, path, targetSum, result) {
  if (index === nums.length) {
    if (targetSum === 0) {
      result.push(path.slice(0));
    }
    return;
  }

  // choose
  path.push(nums[index]);
  helper(nums, index + 1, path, targetSum - nums[index], result);
  path.pop();

  // not choosen
  helper(nums, index + 1, path, targetSum, result);

  return result;
}
const arr = [4, 3, 2, 3, 5, 2, 1],
  k = 4;

console.log(canPartitionKSubsets(arr, k));
