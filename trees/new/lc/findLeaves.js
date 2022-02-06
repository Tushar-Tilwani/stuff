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
 * @return {number[][]}
 */
function findLeaves(root) {
  if (!root) {
    return root;
  }
  const result = [];
  dfs(root, result);
  return result;
}

function dfs(node, result) {
  if (!node.left && !node.right) {
    if (!Array.isArray(result[0])) {
      result[0] = [];
    }
    result[0].push(node.val);
    return 0;
  }
  const leftHeight = node.left ? dfs(node.left, result) : 0;
  const rightHeight = node.right ? dfs(node.right, result) : 0;

  const height = Math.max(leftHeight, rightHeight) + 1;
  if (!Array.isArray(result[height])) {
    result[height] = [];
  }
  result[height].push(node.val);

  return height;
}
