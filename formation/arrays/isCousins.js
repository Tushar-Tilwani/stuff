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

function isCousins(root: TreeNode | null, x: number, y: number): boolean {
  if (!root) {
    return false;
  }
  const result = [false, false];
  dfs(root, x, y, 1, result);

  return result[0];
}

function dfs(node: TreeNode, x: number, y: number, depth: number, result: boolean[]) {
  if (!node) {
    return null;
  }
  if ([x, y].includes(node.val)) {
    return depth;
  }
  const found1 = dfs(node.left, x, y, depth + 1, result);
  const found2 = dfs(node.right, x, y, depth + 1, result);
  // Different parent occurence happen
  if ((found1 && !found2) || (!found1 && found2)) {
    result[1] = true;
  }
  if (found1 === found2 && !result[0] && result[1]) {
    result[0] = true;
  }
  return found1 || found2;
}
