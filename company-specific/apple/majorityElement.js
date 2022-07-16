/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const freqMap = nums.reduce((acc, num) => {
    acc.set(num, (acc.get(num) ?? 0) + 1);
    return acc;
  }, new Map());

  const len = Math.floor(nums.length / 2);

  for (const [key, value] of freqMap.entries()) {
    if (value > len) {
      return key;
    }
  }
  return -1;
};
