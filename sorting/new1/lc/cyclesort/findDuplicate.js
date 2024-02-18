/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = function (nums) {
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    while (nums[i] !== i + 1) {
      const d = nums[i];
      if (d === nums[d - 1]) {
        return d;
      }
      swap(nums, i, d - 1);
    }
  }

  return -1;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(findDuplicate([3,1,3,4,2]));
