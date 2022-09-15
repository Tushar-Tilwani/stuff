/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function (n, connections) {
  const edgeList = connections.reduce((acc, [src, dest]) => {
    if (!acc.has(src)) {
      acc.set(src, []);
    }
    if (!acc.has(dest)) {
      acc.set(dest, []);
    }
    acc.get(src).push(dest);
    acc.get(dest).push(src);
    return acc;
  }, new Map());
  const visited = new Set([0]);
  const arrival = new Array(n).fill(null);
  const parent = new Array(n).fill(null);
  const result = [];
  dfs(0, edgeList, visited, arrival, parent, result);
  return result;
};

let time = 0;

function dfs(node, edgeList, visited, arrival, parent, result) {
  const arrivalTime = time;
  arrival[node] = time++;
  let minArrivalTime = arrivalTime;

  const neighbors = edgeList.get(node);
  for (const neighbor of neighbors) {
    if (visited.has(neighbor)) {
      if (neighbor !== parent[node]) {
        minArrivalTime = Math.min(minArrivalTime, arrival[neighbor]);
      }
      continue;
    }

    visited.add(neighbor);
    parent[neighbor] = node;
    const nMinArrivalTime = dfs(
      neighbor,
      edgeList,
      visited,
      arrival,
      parent,
      result
    );

    console.log(arrival, nMinArrivalTime, arrivalTime);
    if (nMinArrivalTime > arrivalTime) {
      result.push([node, neighbor]);
    }
    minArrivalTime = Math.min(minArrivalTime, nMinArrivalTime);
  }
  return minArrivalTime;
}
