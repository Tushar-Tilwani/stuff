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
  const visited = new Map();
  const rEdgeMap = new Map();
  dfs(node, null, visited, rEdgeMap);
  //   console.log(node, 'h',rEdgeMap.get(1),'h',rEdgeMap.get(2),'h',rEdgeMap.get(3));
  return rEdgeMap.get(node.val);
}

function dfs(node, parent, visited, rEdgeMap) {
  const val = node.val;
  if (!rEdgeMap.has(val)) {
    const transposedNode = new Node();
    transposedNode.val = val;
    rEdgeMap.set(val, transposedNode);
  }
  parent && rEdgeMap.get(node.val).neighbours.push(rEdgeMap.get(parent.val));

  for (const neighbour of node.neighbours) {
    if (visited.has(val) && visited.get(val).has(neighbour.val)) {
      continue;
    }
    if (!visited.has(val)) {
      visited.set(val, new Set());
    }
    visited.get(val).add(neighbour.val);
    dfs(neighbour, node, visited, rEdgeMap);
  }
}
