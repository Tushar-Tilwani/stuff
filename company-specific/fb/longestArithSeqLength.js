/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = function (nums) {
  const dictArray = [];

  for (let i = 0; i < nums.length; i++) {
    dictArray.push(new Map());
    for (let j = 0; j < i; j++) {
      const diff = nums[i] - nums[j];
      dictArray[i].set(diff, (dictArray[j].get(diff) ?? 0) + 1);
    }
  }

  let max = 0;
  for (const dict of dictArray) {
    for (const value of dict.values()) {
      max = Math.max(max, value);
    }
  }
  return max + 1;
};

console.log(longestArithSeqLength([24, 13, 1, 100, 0, 94, 3, 0, 3]));
