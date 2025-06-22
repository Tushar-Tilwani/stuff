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
var isCompleteTree = function (root) {
  if (!root) {
    return true;
  }
  const QUEUE = [root];
  const result = [];
  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    for (let i = 0; i < len; i++) {
      const node = QUEUE.shift();
      result.push(node && node.val);
      if (!node) {
        continue;
      }

      QUEUE.push(node.left);
      QUEUE.push(node.right);
    }
  }
  console.log(result);

  let hasNull = false;
  for (let i = 0; i < result.length; i++) {
    if (hasNull && !!result[i]) {
      return false;
    }
    hasNull = result[i] === null;
  }
  return true;
};
