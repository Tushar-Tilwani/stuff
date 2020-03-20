/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function(nums, k) {
  const fullSum = nums.reduce((acc, v) => acc + v, 0) / k;
  if (!Number.isInteger(fullSum)) {
    return false;
  }
  return helper(0, nums, fullSum, {}, fullSum, k);
};

function helper(startIndex, nums, targetSum, used, fullSum, k) {
  if (k === 1) {
    return true;
  }
  // console.log("Bazinga", targetSum);
  if (targetSum === 0) {
    return helper(0, nums, fullSum, used, fullSum, k - 1);
  }

  for (let i = startIndex; i < nums.length; i++) {
    const num = nums[i];
    if (!used[i]) {
      used[i] = true;
      if (helper(i + 1, nums, targetSum - num, used, fullSum, k)) {
        return true;
      }
      used[i] = false;
    }
  }

  return false;
}

const nums = [
    18,
    20,
    39,
    73,
    96,
    99,
    101,
    111,
    114,
    190,
    207,
    295,
    471,
    649,
    700,
    1037
  ],
  k = 4;
// const nums = [1, 2, 1,5],
//   k = 2;

console.log(canPartitionKSubsets(nums, k));
