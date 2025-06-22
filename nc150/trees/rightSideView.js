/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const rightSideView = function (root) {
  const QUEUE = [[root, 0]];
  const result = [];
  while (QUEUE.length > 0) {
    const [node, level] = QUEUE.shift();
    if (result[level] === undefined) {
      result[level] = node.val;
    }
    if (node.right) {
      QUEUE.push([node.right, level + 1]);
    }

    if (node.left) {
      QUEUE.push([node.left, level + 1]);
    }
  }
  return result;
};
