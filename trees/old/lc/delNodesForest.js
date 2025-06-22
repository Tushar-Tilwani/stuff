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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
  const result = [];
  const toDeleteSet = new Set(to_delete);
  dfs(root, toDeleteSet, result);
  return result;
};

function dfs(node, toDeleteSet, result) {
  if (!node.left && !node.right) {
    if (toDeleteSet.has(node.val)) {
      return null;
    }
    return node;
  }

  if (node.left) {
    node.left = dfs(node.left, toDeleteSet, result);
  }

  if (node.right) {
    node.right = dfs(node.right, toDeleteSet, result);
  }

  if (toDeleteSet.has(node.val)) {
    result.push(node.left);
    result.push(node.right);
    return null;
  }
  return node;
}
