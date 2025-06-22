/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums, requiredSum) {
  const result = [];
  helper(nums, requiredSum, 0, [], result);
  return result;
}

function helper(nums, requiredSum, index, slate, result) {
  if (requiredSum < 0) {
    return;
  }

  if (index > nums.length) {
    return;
  }

  if (requiredSum === 0) {
    result.push(slate.slice(0));
    return;
  }

  helper(nums, requiredSum, index + 1, slate, result);

  slate.push(nums[index]);
  helper(nums, requiredSum - nums[index], index + 1, slate, result);
  slate.pop();
}

console.log(subsets([1, 2, 3], 3));
