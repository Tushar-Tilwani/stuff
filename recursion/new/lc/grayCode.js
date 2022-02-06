/**
 * @param {number} n
 * @return {number[]}
 */
function grayCode(n) {
  return helper(n).map((bArr) => binaryArrToDecimal(bArr));
}

function helper(n) {
  if (n == 1) {
    return [[0], [1]];
  }

  const codes = helper(n - 1);

  return [
    ...codes.map((code) => [0, ...code]),
    ...codes.reverse().map((code) => [1, ...code]),
  ];
}

function binaryArrToDecimal(bArr) {
  const revArr = bArr.reverse();
  const len = bArr.length;

  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += revArr[i] * Math.pow(2, i);
  }
  return sum;
}

console.log(grayCode(2));
