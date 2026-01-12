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

function pathSum(root: TreeNode | null, targetSum: number): number {
  const result: [number] = [0];
  const prefixMap = new Map();
  prefixMap.set(0, 1);
  dfs(root, targetSum, 0, prefixMap, result);
  return result[0];
}

function dfs(
  node: TreeNode | null,
  targetSum: number,
  currentSum: number,
  prefixMap: Map<number, number>,
  result: [number]
) {
  if (!node) {
    return;
  }
  const prefixSum = currentSum + node.val;

  // console.log(prefixMap, prefixSum - targetSum);
  if (prefixMap.has(prefixSum - targetSum)) {
    result[0] += prefixMap.get(prefixSum - targetSum) ?? 0;
  }
  prefixMap.set(prefixSum, (prefixMap.get(prefixSum) ?? 0) + 1);
  dfs(node.left, targetSum, currentSum + node.val, prefixMap, result);
  dfs(node.right, targetSum, prefixSum, prefixMap, result);
  const count = prefixMap.get(prefixSum) ?? 1;
  if (count === 1) {
    prefixMap.delete(prefixSum);
  } else {
    prefixMap.set(prefixSum, count - 1);
  }
  // prefixMap.set(prefixSum, (prefixMap.get(prefixSum) ?? 1) - 1);
}
