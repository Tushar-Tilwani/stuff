/*
 * Complete the 'solveBalancedLineBreaks' function below.
 *
 * The function accepts STRING ARRAY and INTEGER as parameter.
 * Return LONG.
 */

function solveBalancedLineBreaks(words, limit) {
  const result = { score: Infinity, lines: [] };
  helper(words, 0, [], limit, 0, 0, result);
  return result;
}

function helper(words, startIndex, lines, limit, score, lastLineScore, result) {
  if (startIndex === words.length) {
    const finalScore = score - lastLineScore;
    if (finalScore < result.score) {
      result.score = finalScore;
      result.lines = lines.map(line => line.slice(0));
    }
    return;
  }

  let charCount = 0;
  const line = [];
  let localScore = 0;
  for (let i = startIndex; i < words.length; i++) {
    charCount += words[i].length;
    localScore = Math.pow(limit - charCount, 3);

    if (charCount > limit) {
      break;
    }

    line.push(words[i]);
    lines.push(line);

    helper(words, i + 1, lines, limit, score + localScore, localScore, result);
    lines.pop();
    charCount += 1;
  }
}

let words = ["omg", "very", "are", "extreme"];
let limit = 10;

words = ['abcdefghijkl', 'abcdefg', 'abcdefgh', 'abcdefghijklmnopqrstuv'];
limit = 23

words = ["qjeJnFkqq", "JlRjenW", "jg", "badsha", "JK", "PK"];
limit = 13;

console.log(solveBalancedLineBreaks(words, limit));
