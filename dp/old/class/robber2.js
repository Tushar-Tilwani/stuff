// https://leetcode.com/problems/house-robber-ii/
/**
 * @param {number[]} nums
 * @return {number}
 */
/*
Since House[1] and House[n] are adjacent, they cannot be robbed together. 
Therefore, the problem becomes to rob either House[1]-House[n-1] or House[2]-House[n], 
depending on which choice offers more money. 
Now the problem has degenerated to the House Robber, which is already been solved.
*/
var rob = function(nums) {
  if (nums.length < 3) {
    return simpleRob(nums);
  }
  return Math.max(
    simpleRob(nums.slice(0, nums.length - 1)),
    simpleRob(nums.slice(1, nums.length))
  );
};

/**
 * @param {number[]} nums
 * @return {number}
 */

function simpleRob(nums) {
  const TABLE = { "-2": 0, "-1": 0, "0": nums[0], "1": nums[1] };
  const len = nums.length;
  for (let i = 2; i < len; i++) {
    TABLE[i] = nums[i] + Math.max(TABLE[i - 2], TABLE[i - 3]);
  }
  return Math.max(TABLE[len - 2], TABLE[len - 1]) || 0;
}

console.log(rob([1]));
