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
var sumEvenGrandparent = function (root) {
  const result = [0];
  dfs(root, [], result);
  return result[0];
};

function dfs(node, path, result) {
  if (!node) {
    return;
  }
  const grandParent = path[path.length - 2];
  if (isFinite(grandParent) && grandParent % 2 === 0) {
    result[0] += node.val;
  }
  path.push(node.val);
  dfs(node.left, path, result);
  dfs(node.right, path, result);
  path.pop();
}
