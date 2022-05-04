/*
 * Complete the function below.
 */

/*
    For your reference:

    function Node()
    {
        this.val = 0;
        this.neighbours = [];
    }
*/

function build_other_graph(node) {
  const visited = new Set();
  const nodeMap = new Map();
  dfs(node, visited, nodeMap);
  return nodeMap.get(node.val);
}

function dfs(node, visited, nodeMap) {
  const val = node.val;
  if (visited.has(val)) {
    return;
  }
  visited.add(val);
  const currentNode = getNode(nodeMap, val);
  for (const neighbour of node.neighbours) {
    const neighbourVal = neighbour.val;

    getNode(nodeMap, neighbourVal).neighbours.push(currentNode);
    dfs(neighbour, visited, nodeMap);
  }
}

function getNode(nodeMap, val) {
  if (nodeMap.has(val)) {
    return nodeMap.get(val);
  }
  const newNode = new Node();
  newNode.val = val;
  nodeMap.set(val, newNode);
  return newNode;
}
