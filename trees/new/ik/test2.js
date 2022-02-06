/*
For your reference:
const BinaryTreeNode = class {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
};
*/
/**
 * @param {BinaryTreeNode_int32} root
 * @param {int32} k
 * @return {int32}
 */
function kth_smallest_element(root, k) {
  if (!root) {
    return null;
  }
  // Write your code here.
  const result = [0, null];
  dfs(root, k, result);
  return result[1];
}

function dfs(node, k, result) {
  if (!node) {
    return;
  }

  dfs(node.left, k, result);
  result[0] += 1;
  if (result[0] === k) {
    result[1] = node.value;
    return;
  }
  dfs(node.right, k, result);
}
