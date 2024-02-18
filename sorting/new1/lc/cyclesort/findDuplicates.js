/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDuplicates = function (nums) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    while (nums[i] !== i + 1) {
      const d = nums[i] - 1;
      if (nums[i] === nums[d]) {
        break;
      }
      swap(nums, i, d);
    }
  }

  const result = [];
  for (let i = 0; i < len; i++) {
    if (nums[i] !== i + 1) {
      result.push(nums[i]);
    }
  }

//   console.log(nums);
  return result;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));
