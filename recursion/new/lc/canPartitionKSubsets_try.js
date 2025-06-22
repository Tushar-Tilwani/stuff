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

  function helper(nums, partialSum, visitedSet) {
    if (partialSum === 0 && visitedSet.size === nums.length) {
      return true;
    }
    if (partialSum === 0) {
      //reset the partialSum
      return helper(nums, target, visitedSet);
    }

    if (partialSum < 0) {
      return false;
    }

    let result = false;
    for (let i = 0; i < nums.length; i++) {
      if (visitedSet.has(i)) {
        continue;
      }
      visitedSet.add(i);

      result = result || helper(nums, partialSum - nums[i], visitedSet);
      visitedSet.delete(i);
    }

    return result;
  }

  return helper(nums, target, new Set());
};

function sum(nums) {
  return nums.reduce((a, v) => a + v, 0);
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  

let nums = [4, 3, 2, 3, 5, 2, 3],
  k = 4;

nums = [1, 1, 2, 2];
k = 2;

nums = [1, 1, 1, 1, 2, 2, 2, 2];
k = 2;
console.log(canPartitionKSubsets(nums, k));
