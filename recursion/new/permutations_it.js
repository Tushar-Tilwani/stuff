/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = [];

  
  helper(nums, 0, [], result);
  return result;
};

