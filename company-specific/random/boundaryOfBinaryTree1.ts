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

function boundaryOfBinaryTree(root: TreeNode | null): number[] {
  if (!root) {
    return [];
  }
  return dfs(root, true, true, []);
}

function dfs(node: TreeNode, isLeftMost: boolean, isRightMost: boolean, result: number[]) {
  if (!node.left && !node.right) {
    // isBottom
    result.push(node.val);
    return result;
  }

  if (isLeftMost) {
    result.push(node.val);
  }

  if (node.left) {
    dfs(node.left, isLeftMost, !node.right && isRightMost, result);
  }

  if (node.right) {
    dfs(node.right, !node.left && isLeftMost, isRightMost, result);
  }

  if (!isLeftMost && isRightMost) {
    result.push(node.val);
  }
  return result;
}
