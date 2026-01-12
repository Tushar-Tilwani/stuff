function countPalindromePaths(parent: number[], s: string): number {
  const edgeList = new Map<number, number[]>();
  const freq = new Map<number, number>();
  for (let i = 0; i < parent.length; i++) {
    const neighbors = edgeList.get(parent[i]) ?? [];
    neighbors.push(i);
    edgeList.set(parent[i], neighbors);
  }
  let count = 0;
  function dfs(node: number, parentMask: number) {
    const currentMask = parentMask ^ (1 << (s[node].charCodeAt(0) - 97));
    if (freq.has(currentMask)) {
      count += freq.get(currentMask)!;
    }

    for (let i = 0; i <= 26; i++) {
      const ignoredCharMask = currentMask ^ (1 << i);
      if (freq.has(ignoredCharMask)) {
        count += freq.get(ignoredCharMask)!;
      }
    }

    freq.set(currentMask, (freq.get(currentMask) ?? 0) + 1);

    if (!edgeList.has(node)) {
      return;
    }
    const neighbors = edgeList.get(node) ?? [];

    for (const neighbor of neighbors) {
      dfs(neighbor, currentMask);
    }
  }
  dfs(0, 0);
  return count;
}
