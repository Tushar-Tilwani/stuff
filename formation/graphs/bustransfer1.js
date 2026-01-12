function numBusesToDestination(routes, source, target) {
  if(source === target) {
    return 0;
  }
  const routeNodeMap = routes.reduce((acc, route, i) => {
    for (const stop of route) {
      const arr = acc.get(stop) ?? [];
      arr.push(i);
      acc.set(stop, arr);
    }
    return acc;
  }, new Map());

  const joinedRoutes = Array.from(routeNodeMap.values()).filter((routes) => routes.length > 1);
  const edgeList = new Map();
  for (const joinedRoute of joinedRoutes) {
    for (let i = 0; i < joinedRoute.length; i++) {
      const src = joinedRoute[i];
      for (let j = i + 1; j < joinedRoute.length; j++) {
        const dest = joinedRoute[j];

        const srcSet = edgeList.get(src) ?? new Set();
        srcSet.add(dest);
        edgeList.set(src, srcSet);

        const destSet = edgeList.get(dest) ?? new Set();
        destSet.add(src);
        edgeList.set(dest, destSet);
      }
    }
  }

  const sourceRoutes = routeNodeMap.get(source);
  const targetRoutes = routeNodeMap.get(target);

  const visited = new Set();
  const QUEUE = [...sourceRoutes];
  visited.add(...sourceRoutes);
  let result = 0;
  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    for (let i = 0; i < len; i++) {
      const node = QUEUE.shift();
      console.log(routeNodeMap, targetRoutes, node);
      if (targetRoutes.includes(node)) {
        return result+1;
      }
      const neighbors = Array.from(edgeList.get(node)?.values() ?? []);
      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) {
          continue;
        }
        QUEUE.push(neighbor);
        visited.add(neighbor);
      }
    }
    result += 1;
  }

  // console.log(edgeList);
  return -1;
}

console.log(
  numBusesToDestination(
    [
      [1, 2, 7],
      [3, 6, 7],
      [6, 10, 11],
    ],
    1,
    10
  )
);
