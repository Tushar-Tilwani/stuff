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
var countUnivalSubtrees = function (root) {};

function dfs(node, result) {
  if (!node.left && !node.right) {
    result[0] += 1;
    return true;
  }

  let isLeftUniVal,
    isRightUniVal,
    leftVal = node.val, // hack if leftVal is not there
    rightVal = node.val;

  if (node.left) {
    isLeftUniVal = dfs(node.left, result);
    leftVal = node.left.val;
  }

  if (node.right) {
    isRightUniVal = dfs(node.right, result);
    rightVal = node.right.val;
  }

  const isSubtreeUnival = rightVal === leftVal && node.val === leftVal;
  if (isSubtreeUnival) {
    result[0] += 1;
  }

  return isSubtreeUnival;
}
