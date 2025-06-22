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
 * @return {number}
 */
function widthOfBinaryTree(root) {
  if (!root) {
    return 0;
  }
  while (!root.left && root.right) {
    root = root.right;
  }
  while (root.left && !root.right) {
    root = root.left;
  }
  const QUEUE = [[root, 1]];
  let result = 1;
  while (QUEUE.length !== 0) {
    const len = QUEUE.length;
    let first = null;
    let last = null;
    for (let i = 0; i < len; i++) {
      const [node, pos] = QUEUE.shift();
      if (first === null) {
        first = pos;
      }

      last = pos;
      node.left && QUEUE.push([node.left, 2 * pos]);
      node.right && QUEUE.push([node.right, 2 * pos + 1]);
    }
    result = Math.max(last - first + 1, result);
  }
  return result;
}
