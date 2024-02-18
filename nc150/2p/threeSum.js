const sortFn = (a, b) => a - b;

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  nums = nums.sort(sortFn);
  const len = nums.length - 1;
  const result = [];

  for (let i = 0; i <= len; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    const target = -nums[i];
    let left = 0;
    let right = len;
    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum < target || nums[left] === nums[left - 1] || left === i) {
        left++;
        continue;
      }

      if (sum > target || nums[right] === nums[right + 1] || right === i) {
        right--;
        continue;
      }

      // Make it a set
      result.push([nums[i], nums[left], nums[right]].sort(sortFn));
      left++;
      right--;
    }
  }

  return result;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
