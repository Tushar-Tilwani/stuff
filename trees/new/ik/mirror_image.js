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
 */
function mirror_image(root) {
  // Write your code here
  return dfs(root);
}

function dfs(node) {
  if (!node) {
    return null;
  }
  dfs(node.left);
  dfs(node.right);
  swap(node);
  return node;
}

function swap(node) {
  const temp = node.left;
  node.left = node.right;
  node.right = temp;
}
