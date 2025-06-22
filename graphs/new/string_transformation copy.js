/**
 * @param {list_str} words
 * @param {str} start
 * @param {str} stop
 * @return {list_str}
 */
function string_transformation(words, start, stop) {
  if (start === stop) {
    return ["-1"];
  }
  // Write your code here.
  const wordsWithStop = Array.from(new Set([...words, stop]).values());
  const result = [];
  dfs(wordsWithStop, start, stop, new Set(), [], result);
  if (!result[0]) {
    return ["-1"];
  }
  return [start, ...result[0]];
}

function dfs(words, node, stop, visited, slate, result) {
  if (node === stop) {
    if (!result[0] || result[0].length > slate.length) {
      result[0] = slate.slice(0);
    }
    return;
  }
  const neighbors = getNeighbors(words, node, visited);
  for (const neighbor of neighbors) {
    slate.push(neighbor);
    visited.add(neighbor);

    dfs(words, neighbor, stop, visited, slate, result);

    visited.delete(neighbor);
    slate.pop();
  }
}

function getNeighbors(words, node, visited) {
  const result = [];
  for (const word of words) {
    if (!visited.has(word) && isValid(word, node)) {
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
    if (diff > 1) {
      return false;
    }
    diff += 1;
  }

  return true;
}
