/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var lowestCommonAncestor = function (p, q) {
  const result = [];
  dfs(node, p, q, result);
  return result[0];
};

function dfs(node, p, q, result) {
  let numOfFound = 0;

  if (node.val === p.val) {
    numOfFound += 1;
  }

  if (node.val === q.val) {
    numOfFound += 1;
  }

  if (!node.left && !node.right) {
    return numOfFound;
  }

  if (node.left) {
    numOfFound += dfs(node.left, p, q, result);
  }

  if (node.right) {
    numOfFound += dfs(node.right, p, q, result);
  }

  if (numOfFound >= 2) {
    result[0] = node;
  }
  return numOfFound;
}
