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
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  if (!root) {
    return root;
  }
  const result = [];
  dfs(root, result);
  for (let i = 0; i < result.length; i++) {
    node[i].right = node[i + 1] ?? null;
    node[i].left = null;
  }
  return result[0];
};

function dfs(node, result) {
  if (!node) {
    return;
  }

  dfs(node.left, result);
  result.push(node);
  dfs(node.right, result);
}
