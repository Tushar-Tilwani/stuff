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
 * @return {boolean}
 */
function isSymmetric(root) {
  if (!root) {
    return true;
  }
  const QUEUE = [[root.left, root.right]];
  while (QUEUE.length !== 0) {
    const len = QUEUE.length;
    for (let i = 0; i < len; i++) {
      const [node1, node2] = QUEUE.shift();
      if (!node1 && !node2) {
        continue;
      }
      if (!node1 || !node2) {
        return false;
      }

      if (node1.val !== node2.val) {
        return false;
      }

      QUEUE.push([node1.left, node2.right]);
      QUEUE.push([node1.right, node2.left]);
    }
  }
  return true;
}
