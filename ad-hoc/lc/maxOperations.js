/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  const sortedNums = nums.sort((a, b) => a - b);
  let start = 0;
  let end = nums.length - 1;
  let count = 0;
  while (start < end) {
    if (sortedNums[start] + sortedNums[end] < k) {
      start++;
      continue;
    }

    if (sortedNums[start] + sortedNums[end] > k) {
      end--;
      continue;
    }

    count += 1;
    start++;
    end--;
  }

  return count;
};

console.log(maxOperations([1, 2, 3, 4], 5));
