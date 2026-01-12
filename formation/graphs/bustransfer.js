function numBusesToDestination(routes, source, target) {
    
  const edgeList = routes.reduce((acc, route) => {
    for (let i = 0; i < route.length; i++) {
      const source = route[i];
      for (let j = i + 1; j < route.length; j++) {
        const destination = route[j];

        const destinationArr = acc.get(source) ?? [];
        destinationArr.push(destination);
        acc.set(source, destinationArr);

        const sourceArr = acc.get(destination) ?? [];
        sourceArr.push(source);
        acc.set(destination, sourceArr);
      }
    }
    return acc;
  }, new Map());

  //   console.log(edgeList);

  const visited = new Set();
  const QUEUE = [source];
  visited.add(source);
  let result = 0;
  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    for (let i = 0; i < len; i++) {
      const node = QUEUE.shift();
      if (node === target) {
        return result;
      }
      const neighbors = edgeList.get(node) ?? [];
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

  return -1;
}

console.log(
  numBusesToDestination(
    [
      [1, 2, 7],
      [3, 6, 7],
      [9, 10, 11],
    ],
    1,
    9
  )
);
