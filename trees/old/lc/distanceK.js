/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} K
 * @return {number[]}
 */
var distanceK = function (root, target, K) {};

function dfs(node, target, K, depth, result) {
  let foundTarget = false;
  if (node === target) {
    depth = 0;
    foundTarget = true;
  }
  if (!node.left && !node.right) {
    return [{ node, depth, foundTarget  }];
  }
  if (node.left) {
    const leftReturn = dfs(node.left, target, K, depth + 1, result);
  }

  if (node.right) {
    const rightReturn = dfs(node.right, target, K, depth + 1, result);
  }
}
