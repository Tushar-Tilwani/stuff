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
 * @param {number} targetSum
 * @return {number[][]}
 */
function pathSum(root, targetSum) {
  if (!root) {
    return [];
  }
  const result = [];
  dfs(root, targetSum, [], result);
  return result;
}

function dfs(node, target, slate, result) {
  if (node.left === null && node.right === null) {
    if (node.val === target) {
      slate.push(node.val);
      result.push(slate.slice(0));
      slate.pop();
    }
    return;
  }
  slate.push(node.val);
  node.left && dfs(node.left, target - node.val, slate, result);
  node.right && dfs(node.right, target - node.val, slate, result);
  slate.pop();
}
