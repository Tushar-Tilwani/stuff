/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }
  dfs(root);
  return root;
}

function dfs(node: TreeNode) {
  if (!node.left && !node.right) {
    return;
  }
  if (node.left) {
    dfs(node.left);
  }
  if (node.right) {
    dfs(node.right);
  }
  const left = node.left;
  const right = node.right;
  node.left = right;
  node.right = left;
  return node;
}
