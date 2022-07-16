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
var boundaryOfBinaryTree = function (root) {
  if (!root) {
    return root;
  }
  const result = [];
  const QUEUE = [root];
  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    for (let i = 0; i < len; i++) {
      const node = QUEUE.shift();
      node.left && QUEUE.push(node.left);
      node.right && QUEUE.push(node.right);
      if (i == 0 || i === len - 1 || (!node.right && !node.left)) {
        result.push(node.val);
      }
    }
  }
  return result;
};
