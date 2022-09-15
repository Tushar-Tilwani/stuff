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
var sumRootToLeaf = function (root) {
  if (!root) {
    return 0;
  }
  const result = [0];
  dfs(root, [], result);
  return result[0];
};

function dfs(node, path, result) {
  if (!node.left && !node.right) {
    // leaf
    result[0] += bToDecimal([...path, node.val]);
    return;
  }
  path.push(node.val);
  node.left && dfs(node.left, path, result);
  node.right && dfs(node.right, path, result);
  path.pop();
}

function bToDecimal(arr = []) {
  let sum = 0;
  const len = arr.length - 1;
  for (let i = 0; i <= len; i++) {
    sum += arr[i] * Math.pow(2, len - i);
  }
  return sum;
}

console.log(bToDecimal([1, 0, 0]));
