/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  const cloneNode = new Node(node.val, []);
  const cloneMap = new Map();
  cloneMap.set(node.val, cloneNode);
  return dfs(node, cloneNode, cloneMap);
};

function dfs(node, cloneNode, nodeMap) {
  for (const neighbor of node.neighbors) {
    if (nodeMap.has(neighbor.val)) {
      cloneNode.neighbors.push(nodeMap.get(neighbor.val));
      continue;
    }
    const cloneNeighbor = new Node(neighbor.val, []);
    cloneNode.neighbors.push(cloneNeighbor);
    nodeMap.set(neighbor.val, cloneNeighbor);

    dfs(neighbor, cloneNeighbor, nodeMap);
  }

  return cloneNode;
}
