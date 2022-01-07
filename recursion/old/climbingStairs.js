// https://leetcode.com/problems/climbing-stairs/
/**
 * @param {number} n
 * @return {number}
 */
const memo = [0, 1, 2];
var climbStairs = function(n) {
  if (n < 0) {
    return 0;
  }
  if (isFinite(memo[n])) {
    return memo[n];
  }
  memo[n] = climbStairs(n - 1) + climbStairs(n - 2);

  return memo[n];
};
