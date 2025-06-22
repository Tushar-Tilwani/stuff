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
 * @param {number} limit
 * @return {TreeNode}
 */
var sufficientSubset = function (root, limit) {
  if (!root) {
    return null;
  }
  dfs(root, root.val, limit);
  return root;
};

function dfs(node, sumSoFar, limit) {
  if (!node.left && !node.right) {
    return sumSoFar + node.val < limit;
  }
  const leftToDel = !!node.left
    ? dfs(node.left, sumSoFar + node.val, limit)
    : true;
  const rightToDel = !!node.right
    ? dfs(node.right, sumSoFar + node.val, limit)
    : true;

  if (leftToDel) {
    node.left = null;
  }

  if (rightToDel) {
    node.right = null;
  }

  return leftToDel && rightToDel;
}
