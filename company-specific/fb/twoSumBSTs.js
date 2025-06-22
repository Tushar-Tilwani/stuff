/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @param {number} target
 * @return {boolean}
 */
var twoSumBSTs = function (root1, root2, target) {
  return dfs(root1, root2, target);
};

function dfs(node1, node2, target) {
  if (!node1 || !node2) {
    return false;
  }

  if (node1.val + node2.val < target) {
    return dfs(node1.right, node2, target) || dfs(node1, node2.right, target);
  }

  if (node1.val + node2.val > target) {
    return dfs(node1.left, node2, target) || dfs(node1, node2.left, target);
  }

  // node1.val + node2.val === target
  return true;
}
