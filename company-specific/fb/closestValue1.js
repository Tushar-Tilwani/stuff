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
    return null;
  }
  const result = [null, Infinity];
  dfs(node, target, result);
  return result[0];
};

function dfs(node, target, result) {
  if (!node) {
    return;
  }
  const [soFarClosetVal, minDiff] = result;
  const currentDiff = Math.abs(node.val - target);
  if (currentDiff < minDiff) {
    result[0] = node.val;
    result[1] = currentDiff;
  }
  dfs(node.left, target, result);
  dfs(node.right, target, result);
}
