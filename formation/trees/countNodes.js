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
var countNodes = function (root) {
  const leftHeight = getHeight(root, true);
  const rightHeight = getHeight(root, false);
  if (leftHeight === rightHeight) {
    return Math.pow(2, leftHeight) - 1;
  }
  return 1 + countNodes(root.left) + countNodes(root.right);
};

function getHeight(node, isLeft) {
  let height = 0;
  while (node) {
    node = isLeft ? node.left : node.right;
    height += 1;
  }
  return height;
}
