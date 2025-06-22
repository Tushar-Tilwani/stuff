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
  const result = [];
  dfs(root, result);
  console.log(result);
  return true;
};

function dfs(node, result) {
  if (!node) {
    result.push(node && node.val);
    return;
  }
  result.push(node.val);
  dfs(node.left, result);
  dfs(node.right, result);
}
