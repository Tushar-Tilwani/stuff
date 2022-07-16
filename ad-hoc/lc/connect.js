/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (!root) {
    return root;
  }
  const QUEUE = [root];

  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    let prev = null;
    
    for (let i = 0; i < len; i++) {
      const node = QUEUE.shift();
      node.left && QUEUE.push(node.left);
      node.right && QUEUE.push(node.right);
      if (prev) {
        prev.next = node;
      }
      prev = node;
    }
  }
  return root;
};
