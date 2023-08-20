// This is an input class. Do not edit.
class BST {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  function findKthLargestValueInBst(tree, k) {
    // Write your code here.
    const res = [k, null];
    dfs(tree, res);
    return res[1];
  }
  
  function dfs(node, res) {
    if (!node) {
      return;
    }
    
   
    dfs(node.right, res);
    res[0] -= 1;
    if (res[0] === 0) {
      res[1] = node.value;
      return;
    }
    dfs(node.left, res);
  }
  
  // Do not edit the lines below.
  exports.BST = BST;
  exports.findKthLargestValueInBst = findKthLargestValueInBst;
  