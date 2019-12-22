/*
 * Complete the 'wordBreakCount' function below.
 *
 * The function accepts STRING_ARRAY dictionary as parameter
 * and the original string txt on which segmentation is to be
 * performed.
 * The function returns the count of all possible segmentation
 */

function wordBreakCount(dictionary, txt) {
  const len = txt.length;
  const dictSet = dictionary.reduce((acc, v) => {
    acc.add(v);
    return acc;
  }, new Set());

  // Write your code here
  const DPTable = [];

  DPTable[len] = 1;

  for (let start = len - 1; start >= 0; start--) {
    DPTable[start] = 0;
    for (let end = start; end <= len; end++) {
      const localStr = txt.substring(start, end);
      if (dictSet.has(localStr)) {
        DPTable[start] += DPTable[end];
      }
    }
  }

  return DPTable[0];
}

const dict = ["kick", "start", "kickstart", "is", "awe", "some", "awesome"];
const txt = "kickstartisawesome";

console.log(wordBreakCount(dict, txt));
