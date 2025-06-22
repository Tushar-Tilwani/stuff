/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
function fullJustify(words, maxWidth) {
  const result = [];
  let wordsSoFar = [];
  let charsSoFar = 0;
  let i = 0;

  while (i < words.length) {
    const currentWord = words[i];
    const minSpacesRequired = wordsSoFar.length;
    if (charsSoFar + currentWord.length + minSpacesRequired <= maxWidth) {
      charsSoFar += currentWord.length;
      wordsSoFar.push(currentWord);
      i++;
    } else {
      result.push(getSentence(maxWidth, charsSoFar, wordsSoFar).join(""));
      charsSoFar = 0;
      wordsSoFar = [];
    }
  }
  //   console.log(wordsSoFar, charsSoFar);
  result.push(getLastSentence(maxWidth, charsSoFar, wordsSoFar).join(""));
  return result;
}

function getLastSentence(maxWidth, numOfChars, words) {
  const numOfSpaces = words.length - 1;
  let extraSpacesChar = maxWidth - numOfChars - numOfSpaces;
  const result = [words.join(" ")];
  while (extraSpacesChar > 0) {
    result.push(" ");
    extraSpacesChar--;
  }
  return result;
}

function getSentence(maxWidth, numOfChars, words) {
  const numOfSpaces = words.length - 1;
  const result = [];
  const spaces = maxWidth - numOfChars;
  if (numOfSpaces === 0) {
    result.push(words[0]);
    let i = 0;
    while (i < spaces) {
      result.push(" ");
      i++;
    }
  } else {
    const evenSpaces = Math.floor(spaces / numOfSpaces);
    let extraSpaces = spaces % numOfSpaces;
    for (let j = 0; j < words.length - 1; j++) {
      result.push(words[j]);
      let k = 0;
      while (k < evenSpaces) {
        result.push(" ");
        k++;
      }
      if (extraSpaces > 0) {
        result.push(" ");
        extraSpaces--;
      }
    }
    result.push(words[words.length - 1]);
  }
  return result;
}

var words = ["This", "is", "an", "example", "of", "text", "justification."];
var maxWidth = 16;

words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"]
maxWidth = 20;

console.log(fullJustify(words, maxWidth));
