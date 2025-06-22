/*
 * Complete the 'solveBalancedLineBreaks' function below.
 *
 * The function accepts STRING ARRAY and INTEGER as parameter.
 * Return LONG.
 */
/**
 * **SOLUTION**: I know after a month you'll forgot how it was solved.  
 * So here it is:
 * Suppose there words are [omg, very, are, extreme, well, yay, kinda].
 * Assume F(3) is solved. Meaning word [ well, yay,kinda] are solved.
 * F(4) now is: 
 * min(
 * [extreme] in one line + solution of [ well, yay,kinda] or
 * [extreme,well] in one line + solution of [yay,kinda] or
 * [extreme,well,yay] in one line + solution of [kinda] 
 * [extreme,well,yay,kinda] + solution of empty set)
 * This is the assumption that [extreme,well,yay,kinda] all words
 * can fit in one line. If cannot will stop till we reach limit.
 * For example limit is 15. Then we will stop at:
 * [extreme,well,yay].
 * Also, if [extreme,well,yay,kinda] all fit in one line and remaning is empty set 
 * that means it is the last line.
 * 
 * That's where you struggled the most. Future Intelligent Tushar.
 */

/**
 * 
 * @param {String[]} words 
 * @param {Number} limit 
 */

function solveBalancedLineBreaks(words, limit) {
  const DP_TABLE = [];
  const len = words.length;
  for (let i = 0; i < len; i++) {
    DP_TABLE[i] = Infinity;
  }
  DP_TABLE[len] = 0;

  for (let i = len - 1; i >= 0; i--) {
    let charCountInCurrentLine = 0;
    for (let j = i; j < len; j++) {
      charCountInCurrentLine += words[j].length;
      const leftChars = limit - charCountInCurrentLine;
      if (charCountInCurrentLine > limit) {
        break;
      }
      // Last line score is zero
      const score = j === len - 1 ? 0 : Math.pow(leftChars, 3);
      DP_TABLE[i] = Math.min(DP_TABLE[i], score + DP_TABLE[j + 1]);
      // Added for space
      charCountInCurrentLine += 1;
    }
  }
  return DP_TABLE[0];
}

let words = ["omg", "very", "are", "extreme"];
let limit = 10;

words = ["abcdefghijkl", "abcdefg", "abcdefgh", "abcdefghijklmnopqrstuv"];
limit = 23;

words = ["qjeJnFkqq", "JlRjenW", "jg", "badsha", "JK", "PK"];
limit = 13;
console.log(solveBalancedLineBreaks(words, limit));
