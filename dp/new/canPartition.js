/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartition(nums) {
  const total = nums.reduce(add, 0);
  if (total % 2 !== 0) {
    return false;
  }
  const targetSum = total / 2;
  const TABLE = new Array(targetSum + 1).fill(false);
  TABLE[0] = true;

  for (const num of nums) {
    for (let i = targetSum; i >= num; i--) {
      TABLE[i] = TABLE[i] || TABLE[i - num];
      TABLE[num] = true;
      //   if (num <= i) {

      //   }
    }
  }

  return TABLE[targetSum];
}
function add(accumulator, a) {
  return accumulator + a;
}
