const SEP = "_";
/**
 * @param {number[]} nums
 * @return {number}
 */
const missingNumber = function (nums) {
  nums.push(SEP);

  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i) {
      if (nums[i] === SEP) {
        break;
      }
      const val = nums[i];
      swap(nums, i, val);
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === SEP) {
      return i;
    }
  }
  return -1;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

console.log(missingNumber([3, 0, 1]));
