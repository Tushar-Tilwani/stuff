/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  const sortedNums = nums.sort((a, b) => a - b);
  const map = new Map();
  const result = [];
  for (let i = 0; i < sortedNums.length; i++) {
    swap(sortedNums, i, 0);
    const target = -1 * sortedNums[0];
    let left = 1;
    let right = sortedNums.length - 1;
    while (left < right) {
      const sum = sortedNums[left] + sortedNums[right];
      if (sum < target) {
        left++;
        continue;
      }

      if (sum > target) {
        right--;
        continue;
      }

      const value = [sortedNums[0], sortedNums[left], sortedNums[right]].sort();
      map.set(value.join(), value);
      

      left++;
      right--;
    }
    swap(sortedNums, i, 0);
  }
  return result;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
