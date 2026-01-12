/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((acc, a) => acc + a, 0);
  if (sum % 2 !== 0) {
    return false;
  }
  const targetSum = Math.floor(sum / 2);

  const TABLE = new Array(nums.length + 1).fill(null).map(() => new Array(targetSum + 1).fill(false));
//   console.log(TABLE)
  for (let i = 0; i <= nums.length; i++) {
    TABLE[i][0] = true;
  }

  for (let i = 1; i <= nums.length; i++) {
    for (let j = 1; j <= targetSum; j++) {
      // did not pick nums[i-1]
      TABLE[i][j] = TABLE[i - 1][j];

      // pick nums[i-1]
      const updatedTargetSumIfNumPicked = j - nums[i - 1];
      if (updatedTargetSumIfNumPicked < 0) {
        continue;
      }
      TABLE[i][j] = TABLE[i][j] || TABLE[i - 1][updatedTargetSumIfNumPicked];
    }
  }

  console.log(TABLE);

  return TABLE[nums.length][targetSum];
};


console.log(canPartition([2,2,2]));