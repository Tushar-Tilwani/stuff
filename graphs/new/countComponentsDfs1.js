/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function countComponents(n, edges) {
  const edgeList = getEdgeList(n, edges);
  const captured = new Array(n).fill(false);
  let numOfComponents = 0;
  for (let i = 0; i < n; i++) {
    if (captured[i]) {
      continue;
    }
    dfs(i, captured, edgeList);
    numOfComponents += 1;
  }

  return numOfComponents;
}

function dfs(node, captured, edgeList) {
  if (captured[node]) {
    return;
  }
  captured[node] = true;
  const neighbours = edgeList.get(node);
  for (const neighbour of neighbours) {
    dfs(neighbour, captured, edgeList);
  }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function getEdgeList(n, edges) {
  const edgeList = new Map();
  for (let i = 0; i < n; i++) {
    edgeList.set(i, []);
  }

  return edges.reduce((map, [x, y]) => {
    map.get(x).push(y);
    map.get(y).push(x);
    return map;
  }, edgeList);
}
