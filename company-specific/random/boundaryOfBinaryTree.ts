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

const TYPE = {
  LEFT: 0,
  LEAF: 1,
  RIGHT: 2,
};

function boundaryOfBinaryTree(root: TreeNode | null): number[] {
  if (!root) {
    return [];
  }
  const levels: [number, number][][] = [];
  const QUEUE = [root];
  let level = 0;
  while (QUEUE.length) {
    const length = QUEUE.length;
    levels[level] = [];
    for (let i = 0; i < length; i++) {
      const node = QUEUE.shift();
      const isLeaf = !node.right && !node.left;
      let type = -1;
      if (isLeaf) {
        type = TYPE.LEAF;
      } else if (i === 0) {
        type = TYPE.LEFT;
      } else if (i === length - 1) {
        type = TYPE.RIGHT;
      }

      if (type !== -1) {
        levels[level].push([node.val, type]);
      }
      if (node.left) {
        QUEUE.push(node.left);
      }
      if (node.right) {
        QUEUE.push(node.right);
      }
    }
    level++;
  }
  console.log(levels);
  const result: number[] = [];

  return result;
}
