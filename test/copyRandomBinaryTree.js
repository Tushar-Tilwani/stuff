/**
 * // Definition for a _Node.
 * function _Node(val, left, right, random) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.random = random === undefined ? null : random;
 * };
 */

/**
 * @param {_Node} root
 * @return {NodeCopy}
 */
var copyRandomBinaryTree = function (root) {
  const nodeMap = new Map();
  const newRoot = dfs(root, nodeMap);
  // copyRandom(root, newRoot, nodeMap);
  return newRoot;
};

function dfs(node, nodeMap) {
  if (!node) {
    return null;
  }
  const newNode = new NodeCopy(node.val);
  newNode.left = dfs(node.left, nodeMap);
  newNode.right = dfs(node.right, nodeMap);
  nodeMap.set(node, newNode);
  return newNode;
}

function copyRandom(node1, node2, nodeMap) {
  if (!node1 || !node2) {
    return null;
  }
  if (node1.random) {
    node2.random = nodeMap.get(node1.random);
  }

  copyRandom(node1.left, node2.left, nodeMap);
  copyRandom(node1.right, node2.right, nodeMap);
}
