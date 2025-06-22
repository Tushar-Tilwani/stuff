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
function averageOfLevels(root) {
  const QUEUE = [root];
  const result = [];
  while (QUEUE.length !== 0) {
    const len = QUEUE.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
      node = QUEUE.pop();
      sum += node.val;
      node.left && QUEUE.push(node.left);
      node.right && QUEUE.push(node.right);
    }
    result.push(sum / length);
  }
  return result;
}
