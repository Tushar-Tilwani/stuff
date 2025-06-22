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
var isValidBST = function (root) {
  const result = [];
  inOrder(root, result);
  return (
    new Set(result).size === result.length &&
    result.join() === [...result].sort((a, b) => a - b).join()
  );
};

function inOrder(node, arr) {
  if (!node) {
    return;
  }
  inOrder(node.left, arr);
  arr.push(node.val);
  inOrder(node.right, arr);
}
