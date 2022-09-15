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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  const result = [0];
  dfs(root, low, high, result);
  return result[0];
};

function dfs(node, min, max, result) {
  if (!node) {
    return;
  }
  if (node.val >= min && node.val <= max) {
    result[0] += node.val;
  }

  if (node.val >= min) {
    dfs(node.left, min, max, result);
  }

  if (node.val <= max) {
    dfs(node.right, min, max, result);
  }
}
