/*
    Complete the function below.
    Input: A string "strInput" denoting the input string
    Output: A string
 */

function RLE(strInput) {
  const result = [];

  let currentCount = 1;
  let prevChar = strInput[0];
  for (let i = 1; i <= strInput.length; i++) {
    if (strInput[i] === prevChar) {
      currentCount++;
      continue;
    }
    currentCount > 1 && result.push(currentCount);
    result.push(prevChar);
    currentCount = 1;
    prevChar = strInput[i];
  }

  return result.join("");
}
