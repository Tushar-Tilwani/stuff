function numBusesToDestination(routes: number[][], source: number, target: number): number {
  if (source === target) {
    return 0;
  }
  const edgeList = new Map<number, number[]>();
  const revRouteIdMap = routes.reduce((acc, routes, routeId) => {
    for (const route of routes) {
      const routeIdArr = acc.get(route) ?? [];
      routeIdArr.push(routeId);
      acc.set(route, routeIdArr);
    }
    return acc;
  }, new Map<number, number[]>());

  // if src and dest are in same route
  const sourceIds = revRouteIdMap.get(source);
  const destIds = revRouteIdMap.get(target);
  if (!sourceIds || !destIds) {
    return -1;
  }
  for (const src of sourceIds) {
    if (destIds.includes(src)) {
      return 1;
    }
  }

  for (let routeId = 0; routeId < routes.length; routeId++) {
    const route = routes[routeId];
    const neighbors = [];
    for (const dest of route) {
      neighbors.push(...revRouteIdMap.get(dest)!);
    }
    const neighborsSet = new Set(neighbors);
    neighborsSet.delete(routeId);
    edgeList.set(routeId, Array.from(neighborsSet.values()));
  }

  return bfs(edgeList, sourceIds, destIds);
}

function bfs(edgeList: Map<number, number[]>, sources: number[], targets: number[]) {
  // Simple BFS
  const visited = new Set<number>(sources);
  const QUEUE = [...sources];
  let result = 2;
  while (QUEUE.length > 0) {
    const length = QUEUE.length;
    for (let i = 0; i < length; i++) {
      const node = QUEUE.shift()!;
      const neigbors = edgeList.get(node) ?? [];
      for (const neigbor of neigbors) {
        if (targets.includes(neigbor)) {
          return result;
        }
        if (visited.has(neigbor)) {
          continue;
        }
        visited.add(neigbor);
        QUEUE.push(neigbor);
      }
    }
    result += 1;
  }

  return -1;
}
