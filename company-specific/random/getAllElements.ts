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

function getAllElements(
  root1: TreeNode | null,
  root2: TreeNode | null
): number[] {
  const result: number[] = [];
  dfs(root1, root2, result);
  return result;
}

function dfs(node1: TreeNode | null, node2: TreeNode | null, result: number[]) {
  if (!node1 && !node2) {
    return;
  }
  if (node1 && !node2) {
    dfs(node1.left, node2, result);
    result.push(node1.val);
    dfs(node1.right, node2, result);
    return;
  }

  if (!node1 && node2) {
    dfs(node1, node2.left, result);
    result.push(node2.val);
    dfs(node1, node2.right, result);
    return;
  }
  if (node1.val < node2.val) {
    dfs(node1, node2.left, result);
  } else {
    dfs(node1, node2.right, result);
  }
  result.push(node2.val);
}
