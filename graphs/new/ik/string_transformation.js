/**
 * @param {list_str} words
 * @param {str} start
 * @param {str} stop
 * @return {list_str}
 */
function string_transformation(words, start, stop) {
  // Write your code here.
  const wordsWithStop = Array.from(new Set([...words, stop]).values());
  const visited = new Set();
  const parent = new Map();
  if (!bfs(wordsWithStop, start, stop, visited, parent)) {
    return ["-1"];
  }
  return getResult(parent, stop);
}

function bfs(words, start, stop, visited, parent) {
  const QUEUE = [start];
  visited.add(start);
  while (QUEUE.length > 0) {
    const node = QUEUE.shift();
    const neighbors = getNeighbors(words, node, visited);
    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) {
        if (stop === neighbor) {
          parent.set(neighbor, node);
          return true;
        }
        continue;
      }
      visited.add(neighbor);
      parent.set(neighbor, node);
      QUEUE.push(neighbor);
      if (stop === neighbor) {
        return true;
      }
    }
  }

  return false;
}

function getResult(parent, stop) {
  const result = [];
  const visited = new Set();

  let node = stop;
  while (parent.has(node) && !visited.has(node)) {
    result.push(node);
    visited.add(node);
    node = parent.get(node);
  }

  result.push(node);

  return result.reverse();
}

function getNeighbors(words, node, visited) {
  const result = [];
  for (const word of words) {
    if (isValid(word, node)) {
      result.push(word);
    }
  }
  return result;
}

function isValid(word1, word2) {
  let diff = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] === word2[i]) {
      continue;
    }
    diff += 1;
  }

  return diff === 1;
}
