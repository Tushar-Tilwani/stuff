/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
  let successor = null;
  function dfs(node, p, prevRight) {
    if (!node.left && !node.right) {
      if (node === p) {
        successor = prevRight;
      }
      return;
    }

    if (p.val < node.val) {
      dfs(node.left, p, node);
      return;
    }

    if (p.val > node.val) {
      dfs(node.right, p, prevRight);
      return;
    }

    // p=== node
    successor = prevRight;
  }

  dfs(root, p, null);
};
