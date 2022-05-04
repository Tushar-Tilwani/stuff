/**
 * @param {list_str} words
 * @return {str}
 */
function find_order(words) {
  const edgeList = new Map();
  //   let startNode = null;
  for (let i = 0; i < words.length; i++) {
    const prevWord = words[i - 1] ?? " ";
    const nextWord = words[i];
    const result = getWordEdge(prevWord, nextWord);
    if (!result) {
      continue;
    }

    const [from, to] = result;
    // if (startNode === null) {
    //   startNode = from;
    // }

    if (!edgeList.has(from)) {
      edgeList.set(from, []);
    }

    edgeList.get(from).push(to);
  }
  const result = [];
  const visited = new Set();
  for (const key of edgeList.keys()) {
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    dfs(key, edgeList, visited, result);
  }
  return result
    .reverse()
    .filter((s) => !s.trim())
    .join("")
    .trim();
}

// This becomes a course schedule problem

function dfs(node, edgeList, visited, result) {
  const neighbhours = edgeList.get(node) ?? [];
  for (const neighbour of neighbhours) {
    if (visited.has(neighbour)) {
      continue;
    }
    visited.add(neighbour);
    dfs(neighbour, edgeList, visited, result);
  }
  result.push(node);
}

function getWordEdge(word1, word2) {
  const len = Math.min(word1.length, word2.length);
  for (let i = 0; i < len; i++) {
    if (word1[i] !== word2[i]) {
      return [word1[i], word2[i]];
    }
  }
  return;
}
