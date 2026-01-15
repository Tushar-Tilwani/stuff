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
function verticalOrder(root: TreeNode | null): number[][] {
  if (!root) {
    return [];
  }
  const result: Map<number, number[]> = new Map();
  const QUEUE: [TreeNode, number][] = [[root, 0]];
  while (QUEUE.length > 0) {
    const [node, level] = QUEUE.shift()!;
    if (!result.has(level)) {
      result.set(level, []);
    }
    result.get(level)?.push(node.val);
    if (node.left) {
      QUEUE.push([node.left, level - 1]);
    }
    if (node.right) {
      QUEUE.push([node.right, level + 1]);
    }
  }
  const keys = Array.from(result.keys()).sort((a, b) => a - b);
  return keys.map((key) => result.get(key)!);
}
