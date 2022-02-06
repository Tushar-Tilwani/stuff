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
  return dfs(p, q, new Set());
};

function dfs(p, q, set) {
  if (!p && !q) {
    return null;
  }
  if (p === q) {
    return p;
  }
  if (set.has(p)) {
    return p;
  }
  if (set.has(q)) {
    return q;
  }

  set.add(p);
  set.add(q);

  return dfs(p && p.parent, q && q.parent, set);
}
