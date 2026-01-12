"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'getRemovableIndices' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING str1
 *  2. STRING str2
 */

function getRemovableIndices(str1, str2) {
  let i = 0;
  let j = 0;
  let hasAlreadySkipped = false;
  let ans = null;
  while (i < str1.length && j < str2.length) {
    if (str1[i] === str2[j]) {
      i++;
      j++;
      continue;
    }
    if (hasAlreadySkipped) {
      return [-1];
    }
    hasAlreadySkipped = true;
    i++;
    ans = i;
  }
  if (!hasAlreadySkipped) {
    ans = i;
  }
  console.log("result", i);
  const result = [];
  return result;
}

function main() {
  const str1 = readLine();

  const str2 = readLine();

  const result = getRemovableIndices(str1, str2);

  process.stdout.write(result.join("\n") + "\n");
}
