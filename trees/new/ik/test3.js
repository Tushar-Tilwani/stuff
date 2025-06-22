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
 * @param {list_int32} a
 * @return {BinaryTreeNode_int32}
 */
function build_balanced_bst(a) {
  // Write your code here.
  return dfs(a, 0, a.length - 1);
}

function dfs(arr, start, end) {
  if (end < start) {
    return null;
  }
  const mid = start + Math.floor((end - start) / 2);
  const node = new BinaryTreeNode(arr[mid]);
  node.left = dfs(arr, start, mid - 1);
  node.right = dfs(arr, mid + 1, end);
  return node;
}
