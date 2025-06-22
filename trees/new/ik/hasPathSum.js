/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
  if (!root) {
    return false;
  }
  const result = [false];
  dfs(root, targetSum, result);
  return result[0];
}

function dfs(node, target, result) {
  if (node.left === null && node.right === null) {
    result[0] = result[0] || node.val === target;
    return;
  }
  !result[0] && node.left && dfs(node.left, target - node.val, result);
  !result[0] && node.right && dfs(node.right, target - node.val, result);
}
