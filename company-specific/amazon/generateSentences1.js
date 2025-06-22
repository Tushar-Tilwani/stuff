/**
 * @param {string[][]} synonyms
 * @param {string} text
 * @return {string[]}
 */
var generateSentences = function (synonyms, text) {
  const dict = getDict(synonyms);
  const textArr = text.split(" ");
  const result = [];
    console.log(dict)
  helper(textArr, 0, [], dict, result);
  return result.sort();
};

function getDict(synonyms) {
 
  const sampleDict = new Map(synonyms);
  const result = new Map();
  for (const [word] of synonyms) {
       const visited = new Set();
    const values = [];
    dfsMap(word, sampleDict, visited, values);
    for (const val of values) {
        if(result.has(val)){
            
        }
      result.set(val, new Set([]));
    }
  }
  return result;
}

function dfsMap(currentVal, map, visited, result) {
  if (visited.has(currentVal)) {
    return;
  }
  result.push(currentVal);
  visited.add(currentVal);
  if (!map.has(currentVal)) {
    return;
  }
  dfsMap(map.get(currentVal), map, visited, result);
}

function helper(textArr, index, partialSentence, dict, result) {
  if (index === textArr.length) {
    result.push(partialSentence.join(" "));
    return;
  }
  const currentWord = textArr[index];

  if (!dict.has(currentWord)) {
    partialSentence.push(currentWord);
    helper(textArr, index + 1, partialSentence, dict, result);
    partialSentence.pop();
    return;
  }

  for (const synWord of dict.get(currentWord)) {
    partialSentence.push(synWord);
    helper(textArr, index + 1, partialSentence, dict, result);
    partialSentence.pop();
  }
}
