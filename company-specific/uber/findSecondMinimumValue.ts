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

function findSecondMinimumValue(root: TreeNode | null): number {
  if (!root) {
    return -1;
  }
  const result = [Infinity, Infinity];
  dfs(root, result);

  return Number.isFinite(result[1]) ? result[1] : -1;
}

function dfs(node: TreeNode, result: number[]) {
  if (node.val < result[0]) {
    result[1] = result[0];
    result[0] = node.val;
  }
  if (!node.left && !node.right) {
    return;
  }
  if (node.left) {
    dfs(node.left, result);
  }
  if (node.right) {
    dfs(node.right, result);
  }
}
