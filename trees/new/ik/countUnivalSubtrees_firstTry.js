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
function countUnivalSubtrees(root) {
  if (!root) {
    return 0;
  }
  const result = [0];
  dfs(root, result);
  return result[0];
}

function dfs(node, result) {
  if (node.left === null && node.right === null) {
    result[0] += 1;
    return node.val;
  }
  const leftVal = node.left ? dfs(node.left, result) : node.val;
  const rightVal = node.right ? dfs(node.right, result) : node.val;

  if (leftVal === rightVal && node.val === leftVal) {
    result[0] += 1;
    return node.val;
  }

  return null;
}
