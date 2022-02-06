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
function isBalanced(root) {
  return dfs(root)[0];
}

function dfs(node) {
  if (!node) {
    return [true, 0];
  }

  const [leftBalanced, leftHeight] = dfs(node.left);
  if (!leftBalanced) {
    return false;
  }

  const [rightBalanced, rightHeight] = dfs(node.right);
  if (!rightBalanced) {
    return false;
  }

  return [
    Math.abs(leftHeight - rightHeight) <= 1,
    Math.max(leftHeight, rightHeight) + 1,
  ];
}
