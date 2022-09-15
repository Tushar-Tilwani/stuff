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
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  dfs(root);
  return root;
};

function dfs(node) {
  if (!node.left && !node.right) {
    return node;
  }

  let leftNode = null;
  if (node.left) {
    leftNode = dfs(node.left);
    leftNode.right = node;
  }

  let rightNode = null;
  if (node.right) {
    rightNode = dfs(node.right);
  }

  node.left = null;
  return rightNode || node;
}
