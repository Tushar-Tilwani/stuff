// https://leetcode.com/problems/string-to-integer-atoi/submissions/

/**
 * @param {string} str
 * @return {number}
 */

function myAtoi(str) {
  const S = str.trim();
  let startIndex = 0;
  let sign = 1;

  if (S.charAt(0) === "-") {
    startIndex = 1;
    sign = -1;
  }
  if (S.charAt(0) === "+") {
    startIndex = 1;
  }

  let result = 0;
  const zeroAsciiVal = "0".charCodeAt(0);
  const nineAsciiVal = "9".charCodeAt(0);
  const len = S.length;
  const MAX = Math.pow(2, 31);
  for (let i = startIndex; i < len; i++) {
    const charCode = S.charCodeAt(i);
    if (charCode > nineAsciiVal || charCode < zeroAsciiVal) {
      break;
    }
    const digit = S.charCodeAt(i) - zeroAsciiVal;
    result += digit;
    result = result % MAX;
    result *= 10;
  }
  return (sign * result) / 10;
}


console.log(myAtoi("     -123d sss    "));
