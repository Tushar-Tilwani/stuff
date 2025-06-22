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
 * @return {number[][]}
 */
function levelOrder(root) {
  if (!root) {
    return [];
  }
  const QUEUE = [[root, 0]];
  const result = [];
  while (QUEUE.length !== 0) {
    const [node, level] = QUEUE.shift();
    node.left && QUEUE.push([node.left, level + 1]);
    node.right && QUEUE.push([node.right, level + 1]);
    // collect result
    if (!Array.isArray(result[level])) {
      result[level] = [];
    }
    result[level].push(node.val);
  }
  return result;
}
