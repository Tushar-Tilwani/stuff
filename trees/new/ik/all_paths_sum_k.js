/*
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left_ptr = null;
            this.right_ptr = null;
        }
    }

    Complete the function below.
    The function takes a TREENODE and an INTEGER as inputs and is expected to return a 2D INTEGER ARRAY.
*/
function all_paths_sum_k(root, k) {
  const result = [];
  root && dfs(root, k, 0, [], result);
  return result;
}

function dfs(node, k, sumSoFar, slate, result) {
  if (!node.left_ptr && !node.right_ptr) {
    if (sumSoFar + node.val === k) {
      slate.push(node.val);
      result.push(slate.slice(0));
      slate.pop();
    }
    return;
  }

  slate.push(node.val);
  node.left_ptr && dfs(node.left_ptr, k, sumSoFar + node.val, slate, result);
  node.right_ptr && dfs(node.right_ptr, k, sumSoFar + node.val, slate, result);
  slate.pop();
}
