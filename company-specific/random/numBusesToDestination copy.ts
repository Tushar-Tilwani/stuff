function numBusesToDestination2(routes: number[][], source: number, target: number): number {
  //   const routeIdMap = routes.reduce((acc, routes, routeId) => {
  //     acc.set(routeId, new Set(routes));
  //     return acc;
  //   }, new Map<number, Set<number>>());
  const singleDestMap = routes.reduce((acc, routes, routeId) => {
    for (const route of routes) {
      const routeIdArr = acc.get(route) ?? [];
      routeIdArr.push(routeId);
      acc.set(route, routeIdArr);
    }
    return acc;
  }, new Map<number, number[]>());
  console.log(singleDestMap);
  // BFS
  const sourceRoutes = singleDestMap.get(source) ?? [];
  const QUEUE = [...sourceRoutes];
  const visited = new Set<number>(sourceRoutes);
  let result = 0;
  while (QUEUE.length > 0) {
    let length = QUEUE.length;
    const node = QUEUE.shift()!;
    for (let i = 0; i < length; i++) {
      const neigbors = getNeighbors(node, routes, singleDestMap);
      for (const neigbor of neigbors) {
        if (visited.has(neigbor)) {
          continue;
        }
        if (routes[neigbor].includes(target)) {
          return result;
        }
        visited.add(neigbor);
        QUEUE.push(neigbor);
      }
    }
    result += 1;
  }

  return -1;
}

function getNeighbors(routeId: number, routes: number[][], singleDestMap: Map<number, number[]>) {
  const neigborSet = new Set<number>();
  const dests = routes[routeId] ?? [];
  for (const dest of dests) {
    const routeIds = singleDestMap.get(dest) ?? [];
    routeIds.forEach((id) => neigborSet.add(id));
  }
  neigborSet.delete(routeId);
  return Array.from(neigborSet.values());
}
