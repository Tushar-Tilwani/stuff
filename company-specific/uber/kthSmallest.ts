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

function kthSmallest(root: TreeNode | null, k: number): number {
  let result = -1;
  let count = 0;
  function dfs(node: TreeNode | null) {
    if (!node) {
      return;
    }
    if (count === k) {
      result = node.val;
      return;
    }
    dfs(node.left);
    count++;
    dfs(node.right);
  }
  dfs(root);
  return result;
}
