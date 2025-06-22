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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  const result = [0, null];
  dfs(root, k, result);
  return result[1];
};

function dfs(node, k, result) {
  if (!node) {
    return;
  }

  if (Number.isFinite(result[0])) {
    return;
  }

  dfs(node.left, k, result);
  result[0] = result[0] + 1;
  if (result[0] === k) {
    result[1] = node.val;
  }
  dfs(node.right, k, result);
}
