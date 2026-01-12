function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
  const departure = new Map<string, boolean>();
  const suppliesSet = new Set(supplies);
  const edgeList = new Map<string, string[]>();
  for (let i = 0; i < recipes.length; i++) {
    const list = edgeList.get(recipes[i]) ?? [];
    list.push(...ingredients[i]);
    edgeList.set(recipes[i], list);
    for (const ingredient of ingredients[i]) {
      const list = edgeList.get(ingredient) ?? [];
      edgeList.set(ingredient, list);
    }
  }
  const visited = new Set<string>();
  const result: string[] = [];
  for (const recipe of recipes) {
    if (visited.has(recipe)) {
      continue;
    }
    visited.add(recipe);
    dfs(recipe, edgeList, visited, suppliesSet, result, departure);
  }
  console.log(departure);
  return result;
}

function dfs(
  node: string,
  edgeList: Map<string, string[]>,
  visited: Set<string>,
  suppliesSet: Set<string>,
  result: string[],
  departure: Map<string, boolean>
): boolean {
  const neighbors = edgeList.get(node) ?? [];
  // is leaf
  if (neighbors.length === 0) {
    const inSupply = suppliesSet.has(node);
    departure.set(node, inSupply);
    return inSupply;
  }
  let found = true;
  for (const neighbor of neighbors) {
    console.log(node, neighbor);
    if (visited.has(neighbor)) {
      if (!departure.has(neighbor)) {
        // a cycle
        return false;
      }
      found = found && !!departure.get(neighbor);
      continue;
    }
    visited.add(neighbor);
    found = found && dfs(neighbor, edgeList, visited, suppliesSet, result, departure);
  }

  if (found) {
    result.push(node);
  }
  departure.set(node, found);

  return found;
}
