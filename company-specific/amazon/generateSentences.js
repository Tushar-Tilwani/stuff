/**
 * @param {string[][]} synonyms
 * @param {string} text
 * @return {string[]}
 */
var generateSentences = function (synonyms, text) {
  const visited = new Set();
  for (const [word] of synonyms) {
    if (visited.has(word)) {
      return;
    }
    const result = [];
    dfsMap(word, new Map(synonyms), visited, result);
    console.log(result);
  }

  //   console.log(dict);
  const textArr = text.split(" ");
  const result = [];
  //   helper(textArr, 0, [], dict, result);
  return result.sort((s1, s2) => s1.localeCompare(s2));
};

function dfsMap(currentVal, dict, visited, result) {
  if (visited.has(currentVal)) {
    return;
  }
  result.push(currentVal);
  visited.add(currentVal);
  if (!dict.has(currentVal)) {
    return;
  }
  dfsMap(dict.get(currentVal), dict, visited, result);
}
function helper(textArr, index, partialSentence, dict, result) {
  if (index === textArr.length) {
    result.push(partialSentence.join(" "));
    return;
  }
  const currentWord = textArr[index];
  //   const synWords = new Set();
  //   let tempWord = currentWord;
  //   while (dict.has(tempWord) && !synWords.has(tempWord)) {
  //     synWords.add(tempWord);
  //     tempWord = dict.get(tempWord);
  //   }
  //   synWords.add(currentWord);

  if (!dict.has(currentWord)) {
    partialSentence.push(currentWord);
    helper(textArr, index + 1, partialSentence, dict, result);
    partialSentence.pop();
    return;
  }

  for (const synWord of dict.get(currentWord).values()) {
    partialSentence.push(synWord);
    helper(textArr, index + 1, partialSentence, dict, result);
    partialSentence.pop();
  }
}
