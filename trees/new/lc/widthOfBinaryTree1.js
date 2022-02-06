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
function isCompleteTree(root) {
  if (!root) {
    return true;
  }
  const QUEUE = [[root, 1]];
  let expectedId = 1;
  while (QUEUE.length !== 0) {
    const len = QUEUE.length;
    let first = null;
    let last = null;
    for (let i = 0; i < len; i++) {
      const [node, pos] = QUEUE.shift();
      if (expectedId !== pos) {
        return false;
      }
      if (first === null) {
        first = pos;
      }

      last = pos;
      node.left && QUEUE.push([node.left, 2 * pos]);
      node.right && QUEUE.push([node.right, 2 * pos + 1]);
      expectedId += 1;
    }
  }
  return true;
}
