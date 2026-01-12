function findHat(dogs, start) {
  const result = [null];
  dfs(start, dogs, new Set(), result);
  return result[0];
}

function dfs(node, dogs, visited, result) {
  const neighbors = dogs[node] ?? [];
  for (const neighbor of neighbors) {
    if (visited.has(neighbor) || result[0]) {
      continue;
    }
    visited.add(neighbor);
    if (neighbor === "HAT") {
      result[0] = node;
    }
    dfs(neighbor, dogs, visited, result);
  }
}

const dogs = {
  Carter: ["Fido", "Ivy"],
  Ivy: ["HAT"], // Ivy has seen the hat
  Loki: ["Snoopy"],
  Pepper: ["Carter"],
  Snoopy: ["Pepper"],
  Fido: [],
};
console.log("Loki", findHat(dogs, "Loki"));
//findHat(dogs, 'Loki') == 'Ivy'
