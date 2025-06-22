/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum < target) {
      left++;
      continue;
    }

    if (sum > target) {
      right--;
      continue;
    }

    return [left + 1, right + 1];
  }

  return [];
};
