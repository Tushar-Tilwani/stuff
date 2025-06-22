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
 * @return {number}
 */
function diameterOfBinaryTree(root) {
  const result = [0];
  dfs(root, result);
  return result[0];
}

function dfs(node, result) {
  if (!node.left && !node.right) {
    // Local diameter of leaf is 0
    return 0;
  }
  // Local left height is +1 of max height in left subtree.
  // O if not present
  const lh = node.left ? dfs(node.left, result) + 1 : 0;

  // Local left height is +1 of max height in right subtree.
  // O if not present
  const rh = node.right ? dfs(node.right, result) + 1 : 0;

  // Check if local diameter is global
  result[0] = Math.max(result[0], lh + rh);

  return Math.max(lh, rh);
}
