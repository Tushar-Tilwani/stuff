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
 * @return {number}
 */
function pathSum(root, targetSum) {
  const result = [0];
  const map = new Map();
  map.set(0, 1);
  dfs(root, 0, targetSum, map, result);
  return result[0];
}

function dfs(node, prefixSum, target, map, result) {
  if (!node) {
    return;
  }
  const newPrefixSum = prefixSum + node.val;

  if (map.has(newPrefixSum - target)) {
    result[0] += map.get(newPrefixSum - target);
  }

  map.set(newPrefixSum, (map.get(newPrefixSum) ?? 0) + 1);

  dfs(node.left, newPrefixSum, target, map, result);

  dfs(node.right, newPrefixSum, target, map, result);

  map.set(newPrefixSum, map.get(newPrefixSum) - 1);
}
