/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 function subsetsWithDup(nums) {
  const result = [];
  helper(
    nums.sort((a, b) => a - b),
    0,
    [],
    result,
    null
  );
  return result;
}

function helper(nums, index, slate, result, exclude) {
  if (index === nums.length) {
    result.push(slate.slice(0));
    return;
  }

  helper(nums, index + 1, slate, result, nums[index]);

  if (exclude === nums[index]) {
    return;
  }

  slate.push(nums[index]);
  helper(nums, index + 1, slate, result, null);
  slate.pop();
}

console.log(subsetsWithDup([1, 1, 3]));
