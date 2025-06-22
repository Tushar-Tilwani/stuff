/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const sortedNums = nums.map((a, i) => [a, i]).sort((a, b) => a[0] - b[0]);
  let left = 0;
  let right = sortedNums.length - 1;
  while (left < right) {
    const sum = sortedNums[left][0] + sortedNums[right][0];
    if (sum < target) {
      left++;
      continue;
    }

    if (target > sum) {
      right--;
      continue;
    }

    return [sortedNums[left][1], sortedNums[right][1]];
  }
  return [];
};
