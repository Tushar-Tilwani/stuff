function accountsMerge(accounts: string[][]): string[][] {
  const emailMap = new Map<string, string[]>();
  const nameMap = new Map<string, string[]>();
  for (let i = 0; i < accounts.length; i++) {
    const [name, ...emails] = accounts[i];
    const uniquename = [name, i].join();
    nameMap.set(uniquename, emails);
    for (const email of emails) {
      const names = emailMap.get(email) ?? [];
      names.push(uniquename);
      emailMap.set(email, names);
    }
  }

  const visited = new Set<string>();
  const connectedMap = new Map<string, string[]>();
  for (const name of nameMap.keys()) {
    const result: string[] = [];
    if (visited.has(name)) continue;
    visited.add(name);
    dfs(name, emailMap, nameMap, visited, result);
    connectedMap.set(name, uniqueArr(result));
  }

  console.log(connectedMap);
  const result: string[][] = [];

  for (const [rootName, names] of connectedMap.entries()) {
    const [name] = rootName.split(",");
    const emails = names.reduce((acc, name) => {
      const emails = nameMap.get(name) ?? [];
      acc.push(...emails);
      return acc;
    }, [] as string[]);
    result.push([name, ...uniqueArr(emails).sort()]);
  }

  return result;
}

function dfs(
  name: string,
  emailMap: Map<string, string[]>,
  nameMap: Map<string, string[]>,
  visited: Set<string>,
  result: string[]
) {
  result.push(name);
  const neighbors = getNeighbors(name, emailMap, nameMap);
  for (const neighbor of neighbors) {
    if (visited.has(neighbor)) {
      continue;
    }
    visited.add(neighbor);
    dfs(neighbor, emailMap, nameMap, visited, result);
  }
}

function getNeighbors(name: string, emailMap: Map<string, string[]>, nameMap: Map<string, string[]>): string[] {
  const result: string[] = [];
  const emails = nameMap.get(name) ?? [];
  for (const email of emails) {
    const names = emailMap.get(email) ?? [];
    result.push(...names);
  }
  return uniqueArr(result);
}

function uniqueArr(arr: string[]) {
  return Array.from(new Set(arr).values());
}
