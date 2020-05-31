/*
 * Complete the 'zombieCluster' function below.
 *
 * The function accepts STRING ARRAY as parameter.
 */
function zombieCluster(zombies) {
  const captured = [];
  const length = zombies.length;
  for (let i = 0; i < length; i++) {
    captured[i] = false;
  }

  let connectedComponents = 0;
  for (let i = 0; i < length; i++) {
    if (!captured[i]) {
      captured[i] = true;
      bfs(i, zombies, captured);
      connectedComponents += 1;
    }
  }

  return connectedComponents;
}

function bfs(start, zombies, captured) {
  const QUEUE = [start];
  while (QUEUE.length > 0) {
    const index = QUEUE.shift();
    const neighbors = getNeighbors(zombies, index, captured);
    QUEUE.push(...neighbors);
  }

  return captured;
}

function getNeighbors(zombies, index, captured) {
  const relation = zombies[index];
  const neighbors = [];
  for (let i = 0; i < relation.length; i++) {
    if (relation[i] === "1" && !captured[i]) {
      neighbors.push(i);
      captured[i] = true;
    }
  }
  return neighbors;
}

let zombies = ["1100", "1110", "0110", "0001"];

zombies = ["10000", "01000", "00100", "00010", "00001"];

console.log(zombieCluster(zombies));
