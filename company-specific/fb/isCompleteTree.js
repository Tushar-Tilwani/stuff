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
var isCompleteTree = function (root) {
  if (!root) {
    return true;
  }
  return dfs(root);
};

function dfs(node) {
  if (!node.left && !node.right) {
    return [true, false];
  }

  if (!node.left && node.right) {
    return [false, true];
  }

  const rightTrue = !!node.right && dfs(node.right);
  return [leftTrue && rightTrue, rightTrue];
}
