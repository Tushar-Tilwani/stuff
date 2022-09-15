/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  let orange = -1;
  for (let green = 0; green < nums.length; green++) {
    if (nums[green] % 2 === 0) {
      orange++;
      swap(nums, green, orange);
    }
  }
  return nums;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
