/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const sumSet = new Map();
  let result = 0;
  let sum = 0;
  sumSet.set(sum, 1);
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sumSet.has(sum - k)) {
      result += sumSet.get(sum - k);
    }
    sumSet.set(sum, (sumSet.get(sum) ?? 0) + 1);
  }
  return result;
};

console.log(subarraySum([1, 2, 3], 3));
