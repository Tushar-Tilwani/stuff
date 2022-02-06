/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var canPartitionKSubsets = function (nums, k) {
  const target = sum(nums) / k;
  if (!Number.isInteger(target)) {
    return false;
  }

  function helper(nums, partialSum, index) {
    if (partialSum === 0 && index === nums.length) {
      return true;
    }

    if (partialSum === 0) {
      //reset the partialSum
      partialSum = target;
    }

    for (let i = index; i < nums.length; i++) {
      if (partialSum - nums[index] < 0) {
        continue;
      }
      swap(nums, index, i);
      if (helper(nums, partialSum - nums[index], index + 1)) {
        return true;
      }
      swap(nums, index, i);
    }
    return false;
  }

  return helper(
    nums.sort((a, b) => b - a),
    target,
    0
  );
};

function sum(nums) {
  return nums.reduce((a, v) => a + v, 0);
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
