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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    return dfs(root, val);
}

function dfs(node: TreeNode, target: number) {
  if (!node) {
    return null;
  }
  if (node.val === target) {
    return node;
  }
  return dfs(node.left, target) || dfs(node.right, target);
}
