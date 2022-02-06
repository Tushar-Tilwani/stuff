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
 * @param {TreeNode} u
 * @return {TreeNode}
 */
const findNearestRightNode = function (root, u) {
  const result = [Infinity, null];
  bfs(root, u, 0, result);
  return result[1];
};

function bfs(node, u, level, result) {
  if (!node) {
    return;
  }
  if (level > result[0]) {
    return;
  }
  if (result[1] && result[1] !== u) {
    return;
  }
  if (result[1] && level === result[0]) {
    result[0] = level;
    result[1] = node;
    return;
  }
  if (node === u) {
    result[0] = level;
    result[1] = node;
  }
  bfs(node.left, u, level + 1, result);
  bfs(node.right, u, level + 1, result);
}
