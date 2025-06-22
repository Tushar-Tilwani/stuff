function convertColId(colId) {
  let colNumber = 0;
  const baseAsciiVal = "A".charCodeAt(0) - 1;
  for (let i = 0; i < colId.length; i++) {
    colNumber *= 26;
    const digit = colId.charCodeAt(i) - baseAsciiVal;
    colNumber += digit;
  }
  return colNumber;
}

// Revise this question.

function convertColNumber(colNumber) {
  const colId = [];
  while (colNumber > 0) {
    const digit = colNumber % 26;
    colId.push(getChar(digit));

    /**
     * Very Intresting Question!
     * A, B, C is number system which does not have existence of 0.
     * It starts from 1. However when we convert the number to decimal it assumes
     * existence of 0. Thus overshoots each number by 1.
     * Thus colNumber - 1 % 26.
     */

    colNumber = Math.floor((colNumber - 1) / 26);
  }
  return colId.reverse().join("");
}

function getChar(digit) {
  //   // Z is zero
  if (digit === 0) {
    digit = 26;
  }

  const baseAsciiVal = "A".charCodeAt(0) - 1;
  return String.fromCharCode(baseAsciiVal + digit);
}

console.log(convertColNumber(convertColId("AAAAZAZ")));
