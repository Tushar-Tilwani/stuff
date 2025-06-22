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
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  const result = [];
  dfs(root, p, [], result);
  dfs(root, q, [], result);
  const [pPath, qPath] = result;

  let lca = null;

  for (let i = 0; i < Math.min(pPath.length, qPath.length); i++) {
    if (pPath[i] !== qPath[i]) {
      return lca;
    }
    lca = pPath[i];
  }

  return lca;
};

function dfs(node, p, path, result) {
  path.push(node);
  if (node === p) {
    result.push(path.slice(0));
    path.pop();
    return;
  }

  if (node.left === null && node.right === null) {
    path.pop();
    return;
  }

  if (node.left) {
    dfs(node.left, p, path, result);
  }

  if (node.right) {
    dfs(node.right, p, path, result);
  }

  path.pop();
}
