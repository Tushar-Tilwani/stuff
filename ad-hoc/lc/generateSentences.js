/**
 * @param {string[][]} synonyms
 * @param {string} text
 * @return {string[]}
 */
var generateSentences = function (synonyms, text) {
  const { idMap, reverseIdMap } = getMaps(synonyms);
  const words = text.split(" ");
  const output = [];
  getAllSentences(words, [], 0, idMap, reverseIdMap, output);
  console.log(output);

  return output.sort();
};

function getAllSentences(words, slate, index, idMap, reverseIdMap, result) {
  if (index === words.length) {
    result.push(slate.join(" "));
    return;
  }
  const word = words[index];
  const id = idMap[word];
  if (id === undefined) {
    slate.push(word);
    getAllSentences(words, slate, index + 1, idMap, reverseIdMap, result);
    slate.pop();
    return;
  }
  const synonyms = reverseIdMap.get(id);
  for (const synonym of synonyms) {
    slate.push(synonym);
    getAllSentences(words, slate, index + 1, idMap, reverseIdMap, result);
    slate.pop();
  }
}

function getMaps(synonyms) {
  const edgeList = synonyms.reduce((acc, [syn1, syn2]) => {
    if (!acc.has(syn1)) {
      acc.set(syn1, []);
    }

    if (!acc.has(syn2)) {
      acc.set(syn2, []);
    }
    acc.get(syn1).push(syn2);
    acc.get(syn2).push(syn1);
    return acc;
  }, new Map());
  const allWords = Array.from(
    new Set(
      synonyms.reduce((acc, [syn1, syn2]) => {
        acc.push(syn1, syn2);
        return acc;
      }, [])
    ).values()
  );

  let componentId = 1;
  const visited = {};
  for (const word of allWords) {
    if (visited[word]) {
      continue;
    }
    dfs(word, edgeList, visited, componentId);
    componentId++;
  }

  const reverseIdMap = Object.entries(visited).reduce((acc, [word, id]) => {
    if (!acc.has(id)) {
      acc.set(id, []);
    }
    acc.get(id).push(word);
    return acc;
  }, new Map());

  return { idMap: visited, reverseIdMap };
}

function dfs(word, edgeList, visited, componentId) {
  const neighbors = edgeList.get(word) ?? [];
  for (const neighbor of neighbors) {
    if (!!visited[neighbor]) {
      continue;
    }
    visited[neighbor] = componentId;
    dfs(neighbor, edgeList, visited, componentId);
  }
}
