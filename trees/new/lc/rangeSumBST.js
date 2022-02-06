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
function rangeSumBST(root, low, high) {
  const result = [0];
  dfs(root, low, high, result);
  return result[0];
}

function dfs(node, low, high, result) {
  if (!node) {
    return;
  }

  if (node.val >= low && node.val <= high) {
    result[0] += node.val;
  }

  if (node.val >= low) {
    dfs(node.left, low, high, result);
  }

  if (node.val <= high) {
    dfs(node.right, low, high, result);
  }
}
