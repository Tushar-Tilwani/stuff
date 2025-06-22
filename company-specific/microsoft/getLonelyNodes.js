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
var getLonelyNodes = function (root) {
  if (!root) {
    return [];
  }
  return dfs(root, []);
};

function dfs(node, result) {
  if (!node.right && !node.left) {
    return;
  }

  if (node.left && !node.right) {
    result.push(node.left.val);
  }

  if (!node.left && node.right) {
    result.push(node.right.val);
  }

  if (node.left) {
    dfs(node.left, result);
  }

  if (node.right) {
    dfs(node.right, result);
  }
  return result;
}
