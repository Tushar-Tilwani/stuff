/*
 *  Complete the function below.
    Input: A string s
    Output: Nothing. It's a void method
 */

function printStringSinusoidally(s) {
  const ROWS = 3;
  const COlS = s.length;
  const ARR = [];

  for (let i = 0; i < ROWS; i++) {
    ARR[i] = [];
    for (let j = 0; j < COlS; j++) {
      ARR[i].push(" ");
    }
  }

  let row = 2;
  let col = 0;
  let index = 0;
  let rowInc = -1;

  while (index < s.length) {
    ARR[row][col] = s[index] !== " " ? s[index] : "~";
    if (row == ROWS - 1) {
      rowInc = -1;
    }
    if (row === 0) {
      rowInc = 1;
    }
    row += rowInc;
    col += 1;
    index++;
  }

  for (let i = 0; i < ROWS; i++) {
    console.log(ARR[i].join(""));
  }
}

printStringSinusoidally("Divya Tilwani is a good girl");
