/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  if (root === null) {
    return 0;
  }
  const [diameter] = dfs(root);
  return diameter;
};

function dfs(node) {
  if (node.right == null && node.left == null) {
    return [0, 0];
  }
  let leftMaxDiameter = 0,
    leftMaxEdge = -1,
    rightMaxDiameter = 0,
    rightMaxEdge = -1;
  if (node.left !== null) {
    [leftMaxDiameter, leftMaxEdge] = dfs(node.left);
  }
  if (node.right !== null) {
    [rightMaxDiameter, rightMaxEdge] = dfs(node.right);
  }
  return [
    Math.max(leftMaxDiameter, rightMaxDiameter, 2 + leftMaxEdge + rightMaxEdge),
    Math.max(leftMaxEdge + 1, rightMaxEdge + 1)
  ];
}
