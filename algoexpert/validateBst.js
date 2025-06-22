// This is an input class. Do not edit.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function validateBst(tree) {
  // Write your code here.
  return dfs(tree, -Infinity, Infinity);
}

function dfs(node, min, max) {
  if (!node) {
    return true;
  }
  if (node.value >= min && node.value < max) {
    return dfs(node.left, min, node.value) && dfs(node.right, node.value, max);
  }
  return false;
}

// Do not edit the line below.
exports.BST = BST;
exports.validateBst = validateBst;
