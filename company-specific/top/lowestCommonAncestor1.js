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
  const set = new Set();
  while (p !== null) {
    set.add(p.val);
    p = p.parent;
  }

  while (q !== null) {
    if (set.has(q.val)) {
      return q;
    }
    q = q.parent;
  }

  return null;
};
