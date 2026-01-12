let globalTime = 0;

/**
 * @param {string[]} words
 * @return {string}
 */
function alienOrder(words: string[]) {
  const validChars = getAllValidCharacters(words);
  const allLexographicallySorted = checkAllLexographicallySorted(words);
  if (!allLexographicallySorted) {
    return "";
  }
  const edgeSet = getEdgeSet(words, validChars);
  //   if(validChars.length === 1){
  //     return validChars[0];
  //   }
  //   if(edgeSet.size === 0){
  //     return '';
  //   }
  const visitedSet = new Set<string>();
  const result: string[] = [];
  const departureTime = new Map<string, number>();
  for (const char of validChars) {
    if (visitedSet.has(char)) {
      continue;
    }

    visitedSet.add(char);
    const hasCycle = dfsDict(char, edgeSet, result, visitedSet, departureTime);
    if (hasCycle) {
      return "";
    }
  }

  return result.reverse().join("");
}

function dfsDict(
  source: string,
  edgeSet: Map<string, Set<string>>,
  result: string[],
  visitedSet: Set<string>,
  departureTime: Map<string, number>
): boolean {
  let hasCycle = false;
  const neigbors = Array.from(edgeSet.get(source)?.values() ?? []);

  for (const neigbor of neigbors) {
    if (!visitedSet.has(neigbor)) {
      visitedSet.add(neigbor);
      hasCycle = hasCycle || dfsDict(neigbor, edgeSet, result, visitedSet, departureTime);
    } else {
      // check Cycle here
      // That means this visited is still in DFS
      const isCurrentNodeCycle = !departureTime.has(neigbor);
      if (isCurrentNodeCycle) {
        return true;
      }
    }
  }
  result.push(source);
  departureTime.set(source, globalTime++);
  return hasCycle;
}

function getAllValidCharacters(words: string[]) {
  const set = new Set<string>();
  for (const word of words) {
    for (const char of word.split("")) {
      set.add(char);
    }
  }
  return Array.from(set.values());
}

function getEdgeSet(words: string[], validChars: string[]) {
  const edgeList = new Map<string, Set<string>>();
  for (const char of validChars) {
    edgeList.set(char, new Set());
  }
  for (let i = 0; i < words.length - 1; i++) {
    const currWord = words[i];
    const nextWord = words[i + 1];
    const len = Math.min(currWord.length, nextWord.length);
    for (let j = 0; j < len; j++) {
      const currentChar = currWord[j];
      const nextWordChar = nextWord[j];
      if (currentChar !== nextWordChar) {
        const list = edgeList.get(currentChar) ?? new Set();
        list.add(nextWordChar);
        edgeList.set(currentChar, list);
        break;
      }
    }
  }

  return edgeList;
}

function checkAllLexographicallySorted(words: string[]) {
  // check for
  // ["abc","ab"]
  for (let i = 0; i < words.length - 1; i++) {
    const currWord = words[i];
    const nextWord = words[i + 1];
    const len = Math.min(currWord.length, nextWord.length);
    if (currWord.length > nextWord.length && currWord.substring(0, len) === nextWord.substring(0, len)) {
      return false;
    }
    return true;
  }
}
