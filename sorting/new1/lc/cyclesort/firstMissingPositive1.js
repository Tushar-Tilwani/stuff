/**
 * @param {number[]} nums
 * @return {number}
 */
const firstMissingPositive = function (nums) {
  nums = nums.filter((num) => num >= 0);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  if (nums.length === 0 || max <= 0 || min > 1) {
    return 1;
  }

  const len = nums.length;
  for (let i = 0; i < len; i++) {
    while (nums[i] !== i + min) {
      const d = nums[i] - min;
      if (d >= len || nums[d] === nums[i]) {
        break;
      }
      swap(nums, i, d);
    }
  }

  console.log(nums);

  let lastFoundIndex = null;
  for (let i = 0; i < len; i++) {
    if (nums[i] === i + min) {
      lastFoundIndex = i;
    } else {
      const num = nums[lastFoundIndex] + (i - lastFoundIndex);
      if (num >= 1) {
        return num;
      }
    }
  }
  return max + 1;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(firstMissingPositive([0, 0, 0, 2, 2, 2, 3, 3, 3, 5, 5, 5, 5]));
