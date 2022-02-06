/*
    class TreeNode {
        constructor(label) {
            this.label = label;
            this.left_ptr = null;
            this.right_ptr = null;
        }
    }

    Complete the function below.
    The function accepts a TREENODE as input
    and is expected to return an INTEGER ARRAY.
*/

function preorder(root) {
  const result = [];
  dfs(root, result);
  return result;
}

function dfs(node, result) {
  if (!node) {
    return;
  }
  result.push(node.label);
  dfs(node.left_ptr, result);
  dfs(node.right_ptr, result);
}
