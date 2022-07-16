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
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {};

function dfs(node1, node2) {
  if (!node1 && !node2) {
    return null;
  }

  if (!node1 || !node2) {
    return node1 || node2;
  }
  const mergedNode = new TreeNode(node1.val + node2.val);
  mergedNode.left = dfs(node1.left, node2.left);
  mergedNode.right = dfs(node1.right, node2.right);

  return mergedNode;
}
