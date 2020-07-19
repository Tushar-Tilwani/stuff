/**
 * @param {number} n
 * @param {number[][]} red_edges
 * @param {number[][]} blue_edges
 * @return {number[]}
 */
var shortestAlternatingPaths = function(n, red_edges, blue_edges) {
  const redEdgeMap = red_edges.reduce((map, [src, dst]) => {
    if (!map.has(src)) {
      map.set(src, [dst]);
    } else {
      map.get(src).push(dst);
    }
    return map;
  }, new Map());

  const blueEdgeMap = blue_edges.reduce((map, [src, dst]) => {
    if (!map.has(src)) {
      map.set(src, [dst]);
    } else {
      map.get(src).push(dst);
    }
    return map;
  }, new Map());

  let result = new Array(n).fill(-1);
  let redVisited = new Array(n).fill(false);
  let blueVisited = new Array(n).fill(false);

  const redResult = bfs(
    0,
    redVisited,
    blueVisited,
    true,
    redEdgeMap,
    blueEdgeMap,
    result
  ).slice(0);

  result = new Array(n).fill(-1);
  redVisited = new Array(n).fill(false);
  blueVisited = new Array(n).fill(false);

  const blueResult = bfs(
    0,
    redVisited,
    blueVisited,
    false,
    redEdgeMap,
    blueEdgeMap,
    result
  ).slice(0);

  const redNotFoundCount = redResult.filter(r => r !== -1).length;
  const blueNotFoundCount = blueResult.filter(r => r !== -1).length;

  const redSum = redResult
    .filter(r => r !== -1)
    .reduce((acc, val) => acc + val, 0);
  const blueSum = blueResult
    .filter(r => r !== -1)
    .reduce((acc, val) => acc + val, 0);

  if (redNotFoundCount === blueNotFoundCount) {
    return redSum < blueSum ? blueResult : redResult;
  } else if (redNotFoundCount > blueNotFoundCount) {
    return blueResult;
  }

  return redResult;
};

function bfs(
  startNode,
  redVisited,
  blueVisited,
  starColor,
  redEdgeMap,
  blueEdgeMap,
  result
) {
  const QUEUE = [{ node: startNode, distance: 0, color: starColor }];
  // color
  // true=== RED, false===Blue;

  while (QUEUE.length > 0) {
    const { node, distance, color } = QUEUE.shift();
    const visited = color ? redVisited : blueVisited;
    const neighbors =
      (color ? redEdgeMap.get(node) : blueEdgeMap.get(node)) || [];
    result[node] = result[node] === -1 ? distance : result[node];

    visited[node] = true;
    for (const neighbor of neighbors) {
      const visited = !color ? redVisited : blueVisited;
      if (visited[neighbor]) {
        continue;
      }
      QUEUE.push({ node: neighbor, distance: distance + 1, color: !color });
    }
  }

  return result;
}
