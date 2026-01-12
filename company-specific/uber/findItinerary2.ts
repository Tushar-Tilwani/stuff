function findItinerary(tickets: string[][]): string[] {
  const edgeList = tickets.reduce((edgeList, [from, to]) => {
    if (!edgeList.has(from)) {
      edgeList.set(from, []);
    }
    edgeList.get(from)?.push(to);
    return edgeList;
  }, new Map() as Map<string, string[]>);
  for (const [key, values] of edgeList.entries()) {
    edgeList.set(
      key,
      values.sort((a, b) => a.localeCompare(b))
    );
  }

  //   console.log(edgeList);
  const result: string[] = [];
  dfs("JFK", edgeList, new Set(), [], result, tickets.length);
  return result;
}

function dfs(
  node: string,
  edgeList: Map<string, string[]>,
  visited: Set<string>,
  path: string[],
  result: string[],
  target: number
): boolean {
  if (visited.size === target) {
    // used all tickets
    result.push(...path, node);
    return true;
  }
  const neighbors = edgeList.get(node) ?? [];
  for (const neighbor of neighbors) {
    const key = [node, neighbor].join();
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    path.push(node);
    if (dfs(neighbor, edgeList, visited, path, result, target)) {
      path.pop();
      visited.delete(key);
      return true;
    }
    path.pop();
    visited.delete(key);
  }
  return false;
}
