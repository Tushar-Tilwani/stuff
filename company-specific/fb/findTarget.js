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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  if (!root) {
    return false;
  }

  const QUEUE = [root];
  const set = new Set();

  while (QUEUE.length > 0) {
    const node = QUEUE.shift();
    if (set.has(k - node.val)) {
      return true;
    }
    node.left && QUEUE.push(node.left);
    node.right && QUEUE.push(node.right);
    set.add(node.val);
  }

  return false;
};
