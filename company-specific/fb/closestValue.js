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
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
  if (!root) {
    return -1;
  }
  return dfs(root, target);
};

function dfs(node, target) {
  const diff = Math.abs(node.val - target);

  if (!node.left && !node.right) {
    return diff;
  }

  const leftDiff = !!node.left ? Math.abs(node.left.val - target) : Infinity;
  const rightDiff = !!node.right ? Math.abs(node.right.val - target) : Infinity;

  if (diff < leftDiff && diff < rightDiff) {
    return diff;
  }

  if (leftDiff < rightDiff) {
    return dfs(node.left, target);
  }

  return dfs(node.right, target);
}
