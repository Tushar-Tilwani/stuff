/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST(nums) {
  return helper(nums, 0, nums.length - 1);
}

function helper(nums, start, end) {
  if (start > end) {
    return null;
  }
  const mid = start + Math.floor((end - start) / 2);
  return new TreeNode(
    nums[mid],
    helper(nums, start, mid - 1),
    helper(nums, mid + 1, end)
  );
}
