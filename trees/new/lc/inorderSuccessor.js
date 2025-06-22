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
function inorderSuccessor(root, p) {
  return dfs(p, root, null);
}

function dfs(p, current, canBeSuccessor) {
  /**
   * Found node does not have any right subtree.
   * So the value is going to be in one of grandparents
   * */
  if (current === null) {
    return null;
  }

  if (p.val > current.val) {
    return dfs(p, current.right, canBeSuccessor);
  }

  if (p.val < current.val) {
    return dfs(p, current.left, current);
  }

  // p===current
  return canBeSuccessor;
}
