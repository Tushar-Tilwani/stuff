/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val === undefined ? 0 : val;
 *    this.children = children === undefined ? [] : children;
 * };
 */

/**
 * @param {Node[]} tree
 * @return {Node}
 */
var findRoot = function (tree) {
  const parent = new Set();
  for (const node of tree) {
    for (const child of node.children) {
      parent.add(child.val);
    }
  }
//   console.log(parent);
  for (const node of tree) {
    if (!parent.has(node.val)) {
      return node;
    }
  }
  return null;
};
