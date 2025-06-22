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
 * @param {number} from
 * @param {number} to
 * @return {TreeNode}
 */
var correctBinaryTree = function (root) {
  return dfs(root, new Set());
};

function dfs(node, visited) {
  if (!node) {
    return;
  }

  if (node.right && visited.has(node.right.val)) {
    return null;
  }

  visited.add(node.val);

  node.right = dfs(node.right, visited);
  node.left = dfs(node.left, visited);

  return node;
}
