// You needed a hint
function findItinerary(tickets: string[][]): string[] {
  const edgeList = tickets.reduce((acc, [from, to]) => {
    const froms = acc.get(from) ?? [];
    froms.push(to);
    acc.set(from, froms);
    return acc;
  }, new Map<string, string[]>());
  for (const dests of edgeList.values()) {
    dests.sort((a, b) => b.localeCompare(a));
  }
  const result: string[] = [];
  function dfs(node?: string) {
    if (!node) {
      return;
    }
    const neighbors = edgeList.get(node);
    while (neighbors?.length) {
      dfs(neighbors?.pop());
    }
    result.push(node);
  }
  dfs("JFK");
  return result.reverse();
}
