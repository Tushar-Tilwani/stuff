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

/**
 Do not return anything, modify root in-place instead.
 */

function flatten(root: TreeNode | null): void {
  let previous: TreeNode = new TreeNode(-1, root);
  function dfs(node: TreeNode | null): TreeNode {
    if (!node) {
      return;
    }
    const left = node.left;
    const right = node.right;
    previous.left = null;
    previous.right = node;
    previous = node;
    dfs(left);
    dfs(right);
  }
  dfs(root);
}
