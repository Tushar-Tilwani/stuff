/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const total = nums.reduce(add, 0);
  if (total % 2 !== 0) {
    return false;
  }

  const result = [false];
  subsetsHelper(nums, 0, total / 2, [], result);
  return result[0];
};

function subsetsHelper(nums, startIndex, sum, path, result) {
  if (sum == 0) {
    result[0] = true;
  }

  if (result[0] || startIndex === nums.length) {
    return;
  }

  subsetsHelper(nums, startIndex + 1, sum, path, result);
  path.push(nums[startIndex]);
  subsetsHelper(nums, startIndex + 1, sum - nums[startIndex], path, result);
  path.pop();
}

function add(accumulator, a) {
  return accumulator + a;
}

let nums = [1, 5, 11, 5];

console.log(canPartition(nums));
