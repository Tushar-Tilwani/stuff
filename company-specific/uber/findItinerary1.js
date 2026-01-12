const sortFn = (a, b) => a.localeCompare(b);

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  const edgeList = tickets.reduce((edgeList, [from, to], index) => {
    if (!edgeList.has(from)) {
      edgeList.set(from, []);
    }
    edgeList.get(from).push({ to, index });
    return edgeList;
  }, new Map());

  for (const key of edgeList.keys()) {
    edgeList.get(key).sort(sortFn);
  }

  // console.log(edgeList);

  const result = [];
  dfs("JFK", edgeList, ["JFK"], tickets.length, new Set(), result);

  return result;
};

function dfs(node, edgeList, path, total, visited, result) {
  if (result.length > 0) {
    return;
  }

  if (total === visited.size) {
    result.push(path.slice(0));
    return;
  }

  const neighbors = edgeList.get(node) ?? [];
  for (const { to: neighbor, index } of neighbors) {
    const key = [node, neighbor, index].join();
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    path.push(neighbor);
    dfs(neighbor, edgeList, path, total, visited, result);
    visited.delete(key);
    path.pop();
  }
}
