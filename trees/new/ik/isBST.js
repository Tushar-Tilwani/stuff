/*
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left_ptr = null;
            this.right_ptr = null;
        }
    }
*/
/*
 * Complete the function below.
 */
function isBST(root) {
  if (!root) {
    return true;
  }
  return dfs(root, -Infinity, Infinity);
}

function dfs(node, min, max) {
  const isCurrentValid = node.val >= min && node.val <= max;

  // Short circuit
  if (!isCurrentValid) {
    return false;
  }

  // Leaf node
  if (!node.left_ptr && !node.right_ptr) {
    return isCurrentValid;
  }

  const isLeftBst = node.left_ptr
    ? dfs(node.left_ptr, Math.min(node.val, min), Math.min(node.val, max))
    : true;

  const isRightBst = node.right_ptr
    ? isLeftBst &&
      dfs(node.right_ptr, Math.max(node.val, min), Math.max(node.val, max))
    : true;

  return isLeftBst && isRightBst;
}
