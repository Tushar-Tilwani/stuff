function numBusesToDestination1(routes: number[][], source: number, target: number): number {
  if (source === target) {
    return 0;
  }
  const edgeList = new Map<number, number[]>();
  for (const route of routes) {
    for (let i = 0; i < route.length; i++) {
      const routeI = route[i];
      if (!edgeList.has(routeI)) {
        edgeList.set(routeI, []);
      }
      for (let j = i + 1; j < route.length; j++) {
        const routeJ = route[j];
        if (!edgeList.has(routeJ)) {
          edgeList.set(routeJ, []);
        }
        edgeList.get(routeI)?.push(routeJ);
        edgeList.get(routeJ)?.push(routeI);
      }
    }
  }
  //   console.log(edgeList);
  // Simple BFS
  const visited = new Set<number>([source]);
  const QUEUE = [source];
  let result = 1;
  while (QUEUE.length > 0) {
    const length = QUEUE.length;
    for (let i = 0; i < length; i++) {
      const route = QUEUE.shift()!;
      const neigbors = edgeList.get(route)!;
      for (const neigbor of neigbors) {
        if (neigbor === target) {
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
