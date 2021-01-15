/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function (t1, t2) {
  return mergeNode(t1, t2);
};

function mergeNode(node1, node2) {
  if (!node1 && !node2) {
    return null;
  }
  const mergedNode = new TreeNode();
  mergedNode.val = ((node1 && node1.val) || 0) + ((node2 && node2.val) || 0);
  mergedNode.left = mergeNode(node1 && node1.left, node2 && node2.left);
  mergedNode.right = mergeNode(node1 && node1.right, node2 && node2.right);
  return mergedNode;
}
