/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
  const result = [];
  helper(nums, 0, [], result);
  return result;
}

function helper(nums, index, slate, result) {
  if (index === nums.length) {
    result.push(slate.slice(0));
    return;
  }

  helper(nums, index + 1, slate, result);

  slate.push(nums[index]);
  helper(nums, index + 1, slate, result);
  slate.pop();
}

console.log(subsets([1, 2, 1]));
