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
 * @return {boolean}
 */
var isValidBST = function (root) {
  if (!root) {
    return true;
  }
  return dfs(root, -Infinity, Infinity);
};

function dfs(node, min, max) {
  if (!node.left && !node.right) {
    return node.val > min && node.val < max;
  }

  if (!(node.val > min && node.val < max)) {
    return false;
  }

  const isLeftBst = node.left
    ? dfs(node.left, Math.min(node.val, min), Math.min(node.val, max))
    : true;
  const isRightBst = node.right
    ? isLeftBst &&
      dfs(node.right, Math.max(node.val, min), Math.max(node.val, max))
    : true;

  return isLeftBst && isRightBst;
}
