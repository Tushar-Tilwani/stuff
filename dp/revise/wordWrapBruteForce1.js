/*
 * Complete the 'solveBalancedLineBreaks' function below.
 *
 * The function accepts STRING ARRAY and INTEGER as parameter.
 * Return LONG.
 */

function solveBalancedLineBreaks(words, limit) {
  const result = [Infinity];
  helper(words, 0, limit, 0, result);
  return result[0];
}

function helper(words, startIndex, limit, score, result) {
  console.log(startIndex, score);
  if (startIndex === words.length) {
    if (score < result[0]) {
      result[0] = score;
    }
    return;
  }

  let charCount = 0;
  let localScore = 0;
  for (let i = startIndex; i < words.length; i++) {
    charCount += words[i].length;
    localScore = Math.pow(limit - charCount, 3);
    if (charCount > limit) {
      break;
    }

    if (i + 1 === words.length) {
      helper(words, i + 1, limit, score, result);
    } else {
      helper(words, i + 1, limit, score + localScore, result);
    }

    charCount += 1;
  }
}

let words = ["omg", "very", "are", "extreme"];
let limit = 10;

words = ["abcdefghijkl", "abcdefg", "abcdefgh", "abcdefghijklmnopqrstuv"];
limit = 23;

console.log(solveBalancedLineBreaks(words, limit));
