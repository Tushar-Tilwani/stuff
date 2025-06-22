/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDisappearedNumbers = function (nums) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    while (nums[i] !== i + 1) {
      const d = nums[i];
      if (d === nums[d - 1]) {
        break;
      }
      swap(nums, i, d - 1);
    }
  }
  const result = [];
  for (let i = 0; i < len; i++) {
    const expectedNum = i + 1;
    if (nums[i] !== expectedNum) {
      result.push(expectedNum);
    }
  }

  return result;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));
