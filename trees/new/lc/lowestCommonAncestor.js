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
function lowestCommonAncestor(root, p, q) {
  if (!root) {
    return null;
  }
  const result = [];
  dfs(root, p, q, result);
  return result[0];
}

function dfs(node, p, q, result) {
  if (!node.left && !node.right) {
    return [node.val === p, node.val === q];
  }
  if (result[0]) {
    return [true, true];
  }
  const [plFound, qlFound] = node.left
    ? dfs(node.left, p, q, result)
    : [false, false];

  const [prFound, qrFound] = node.right
    ? dfs(node.right, p, q, result)
    : [false, false];

  const pFound = plFound || prFound || node.val === p;
  const qFound = qlFound || qrFound || node.val === q;

  if (pFound && qFound && !result[0]) {
    result[0] = node;
  }

  return [pFound, qFound];
}

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
var lowestCommonAncestor = function (root, p, q) {
  return dfs(root, p, q)[1];
};

function dfs(node, p, q) {
  if (!node) {
    return [0, null];
  }

  const [lNums, lFound] = dfs(node.left, p, q);
  if (lFound) {
    return [lNums, lFound];
  }

  const [rNums, rFound] = dfs(node.right, p, q);
  if (rFound) {
    return [rNums, rFound];
  }

  let currentFoundNum = lNums + rNums;

  if (node.val === p.val || node.val === q.val) {
    currentFoundNum += 1;
  }

  if (currentFoundNum >= 2) {
    return [currentFoundNum, node];
  }

  return [currentFoundNum, null];
}
