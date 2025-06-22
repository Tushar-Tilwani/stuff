/*
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left_ptr = null;
            this.right_ptr = null;
        }
    }
*/

/**
 * @param {TreeNode} root Root of the input tree.
 * @return {TreeNode} Root of the output tree.
 */
function flipUpsideDown(root) {
  // Complete this function.
  const result = [null];
  root && dfs(root, result);
  return result[0];
}

function dfs(node, result) {
  if (!node.left_ptr && !node.right_ptr) {
    result[0] = node;
    return;
  }
  dfs(node.left_ptr);
  node.left_ptr.left_ptr = node;
  node.left_ptr.right_ptr = node.right_ptr;
}
