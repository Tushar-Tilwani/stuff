/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  const result = [0];
  dfs(root, result);
  return result[0];
};

function dfs(node, result) {
  if (!node) {
    return 0;
  }
  const L = dfs(node.left, result);
  const R = dfs(node.right, result);
  result[0] = Math.max(result[0], L + R);

  return Math.max(L, R) + 1;
}
