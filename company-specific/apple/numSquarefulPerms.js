/**
 * @param {number[]} nums
 * @return {number}
 */
var numSquarefulPerms = function (nums) {
  const result = [];
  allPerms(nums, 0, [], result);
  console.log(result);
  return result.length;
};

function allPerms(nums, index, slate, result) {
  if (index === nums.length) {
    result.push(slate.slice(0));
    return;
  }

  const dupSet = new Set();
  for (let i = index; i < nums.length; i++) {
    if (!isSqrt(slate, nums[i]) || dupSet.has(nums[i])) {
      continue;
    }
    dupSet.add(nums[i]);
    slate.push(nums[i]);
    swap(nums, i, index);
    allPerms(nums, index + 1, slate, result);
    swap(nums, i, index);
    slate.pop();
  }
}

function isSqrt(slate, newVal) {
  if (slate.length < 1) {
    return true;
  }
  return Number.isInteger(Math.sqrt(slate[slate.length - 1] + newVal));
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
