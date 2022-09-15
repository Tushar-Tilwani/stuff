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
var largestValues = function (root) {
  if (!root) {
    return [];
  }
  const QUEUE = [root];
  const result = [];
  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    let max = -Infinity;
    for (let i = 0; i < len; i++) {
      const node = QUEUE.shift();
      node.left && QUEUE.push(node.left);
      node.right && QUEUE.push(node.right);
      max = Math.max(max, node.val);
    }
    result.push(max);
  }
  return result;
};
