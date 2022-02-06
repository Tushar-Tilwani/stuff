/*
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left_ptr_ptr = null;
            this.right_ptr_ptr = null;
        }
    }

    Complete the function below.
    The function takes a TREENODE as input and is expected to return a TREENODE.
*/

function binary_tree_to_cdll(root) {
  if (!root) {
    return null;
  }
  if (!root.left_ptr && !root.right_ptr) {
    return root;
  }
  const lastvisited = [new TreeNode()];
  const firstvisited = [null];
  dfs(node, lastvisited, firstvisited);
  firstvisited[0].left_ptr = lastvisited[0];
  lastvisited[0].right_ptr = firstvisited[0];
  return firstvisited[0];
}

function dfs(node, lastvisited, firstvisited) {
  if (!node) {
    return;
  }

  dfs(node.left_ptr, node);
  node.left_ptr = lastvisited[0];
  lastvisited[0].right_ptr = node;

  lastvisited[0] = node;
  firstvisited[0] = firstvisited[0] || node;
  dfs(node.right_ptr, node);
}
