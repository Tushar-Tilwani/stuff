let time = 0;
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function (n, connections) {
  const edgeList = getEdgeList(connections);
  const parent = new Array(n).fill(null);
  const departure = new Array(n).fill(-1);
  const arrival = new Array(n).fill(Infinity);
  const source = 0;
  const result = [];
  parent[source] = -1;
  dfs(source, edgeList, parent, departure, arrival, result);
  return result;
};

function dfs(node, edgeList, parent, departure, arrival, result) {
  let minArrival = Infinity;
  arrival[node] = time++;
  const neighbors = edgeList.get(node);
  for (const neighbor of neighbors) {
    if (parent[neighbor] === null) {
      parent[neighbor] = node;
      minArrival = Math.min(minArrival, dfs(neighbor, edgeList, parent, departure, arrival, result));
    } else {
      if (neighbor !== parent[node]) {
        minArrival = Math.min(minArrival, arrival[neighbor]);
      }
    }
  }
  //    console.log(minArrival , arrival[node], [parent[node], node])
  if (minArrival > arrival[node] && parent[node] !== -1) {
    result.push([parent[node], node]);
  }
  departure[node] = time++;
  return minArrival;
}

function getEdgeList(connections) {
  return connections.reduce((acc, [src, dest]) => {
    const sNeighbors = acc.get(src) ?? [];
    const dNeighbors = acc.get(dest) ?? [];
    sNeighbors.push(dest);
    dNeighbors.push(src);
    acc.set(src, sNeighbors);
    acc.set(dest, dNeighbors);
    return acc;
  }, new Map());
}
