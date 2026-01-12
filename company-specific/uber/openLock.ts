function openLock(deadends: string[], target: string): number {
  const visited = new Set<string>(deadends);
  const START = [0, 0, 0, 0];
  const START_STR = START.join("");
  if (visited.has(START_STR)) {
    return -1;
  }
  if (target === START_STR) {
    return 0;
  }
  const QUEUE = [START];
  visited.add(START_STR);
  let moves = 0;
  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    for (let i = 0; i < len; i++) {
      const node = QUEUE.shift()!;
      const neighbors = getNeighbors(node, visited);
      for (const neighbor of neighbors) {
        const strNeighbor = neighbor.join("");
        if (strNeighbor === target) {
          return moves + 1;
        }
        QUEUE.push(neighbor);
        visited.add(strNeighbor);
      }
    }
    moves += 1;
  }
  return -1;
}

function getNeighbors(current: number[], visited: Set<string>) {
  const result: number[][] = [];
  for (let i = 0; i < current.length; i++) {
    const old = current[i];
    current[i] = old + 1 === 10 ? 0 : old + 1;
    if (!visited.has(current.join(""))) result.push(current.slice(0));
    current[i] = old - 1 === -1 ? 9 : old - 1;
    if (!visited.has(current.join(""))) result.push(current.slice(0));
    current[i] = old;
  }

  return result;
}
