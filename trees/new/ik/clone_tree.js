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
 * @return {BinaryTreeNode_int32}
 */
function clone_tree(root) {
  // Write your code here.
  return dfs(root);
}

function dfs(node) {
  if (!node) {
    return null;
  }
  const cloneNode = new BinaryTreeNode(node.val);
  cloneNode.left = dfs(node.left);
  cloneNode.right = dfs(node.right);
  return cloneNode;
}
